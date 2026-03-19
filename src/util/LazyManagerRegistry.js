'use strict';

/**
 * Gestionnaire de lazy loading pour les managers Discord.js
 * Permet d'initialiser les managers seulement lorsqu'ils sont accédés pour la première fois
 */
class LazyManagerRegistry {
  constructor(client) {
    this.client = client;
    this.managers = new Map();
    this.factories = new Map();
    this.initializationOrder = [];

    /**
     * Statistiques de lazy loading
     * @type {Object}
     */
    this.stats = {
      totalManagers: 0,
      initializedManagers: 0,
      deferredInitializations: 0,
      initializationTime: 0,
      memorySaved: 0, // Estimé
    };
  }

  /**
   * Enregistre un factory pour un manager
   * @param {string} name Nom du manager
   * @param {Function} factory Fonction pour créer le manager
   * @param {number} [priority=0] Priorité d'initialisation (plus élevé = plus prioritaire)
   */
  register(name, factory, priority = 0) {
    this.factories.set(name, { factory, priority });
    this.stats.totalManagers++;

    // Trier par priorité
    if (priority > 0) {
      this.initializationOrder.push(name);
      this.initializationOrder.sort((a, b) => {
        const priorityA = this.factories.get(a)?.priority || 0;
        const priorityB = this.factories.get(b)?.priority || 0;
        return priorityB - priorityA;
      });
    }
  }

  /**
   * Récupère ou initialise un manager
   * @param {string} name Nom du manager
   * @returns {*} Le manager instance
   */
  get(name) {
    if (this.managers.has(name)) {
      return this.managers.get(name);
    }

    if (!this.factories.has(name)) {
      throw new Error(`Manager '${name}' non enregistré`);
    }

    return this.initialize(name);
  }

  /**
   * Initialise un manager spécifique
   * @param {string} name Nom du manager
   * @returns {*} Le manager initialisé
   */
  initialize(name) {
    const startTime = Date.now();
    const { factory } = this.factories.get(name);

    try {
      const manager = factory(this.client);
      this.managers.set(name, manager);

      const initTime = Date.now() - startTime;
      this.stats.initializationTime += initTime;
      this.stats.initializedManagers++;

      // Log de performance si debug activé
      if (this.client.options?.debug) {
        this.client.emit(
          'debug',
          `[LazyManager] Initialisé ${name} en ${initTime}ms | ` +
            `Total: ${this.stats.initializedManagers}/${this.stats.totalManagers}`,
        );
      }

      return manager;
    } catch (error) {
      this.client.emit('error', new Error(`Échec d'initialisation du manager ${name}: ${error.message}`));
      throw error;
    }
  }

  /**
   * Vérifie si un manager est initialisé
   * @param {string} name Nom du manager
   * @returns {boolean}
   */
  isInitialized(name) {
    return this.managers.has(name);
  }

  /**
   * Pré-initialise les managers haute priorité
   * @param {Array<string>} [names] Noms spécifiques à initialiser, sinon utilise l'ordre de priorité
   */
  async preInitialize(names = null) {
    const toInitialize =
      names ||
      this.initializationOrder.filter(name => {
        const { priority } = this.factories.get(name);
        return priority > 5; // Haute priorité
      });

    const startTime = Date.now();

    for (const name of toInitialize) {
      if (!this.isInitialized(name)) {
        this.initialize(name);
      }
    }

    this.stats.deferredInitializations = toInitialize.length;

    if (this.client.options?.debug) {
      this.client.emit(
        'debug',
        `[LazyManager] Pré-initialisation de ${toInitialize.length} managers en ${Date.now() - startTime}ms`,
      );
    }
  }

  /**
   * Initialise tous les managers (fallback)
   */
  initializeAll() {
    const startTime = Date.now();

    for (const name of this.factories.keys()) {
      if (!this.isInitialized(name)) {
        this.initialize(name);
      }
    }

    if (this.client.options?.debug) {
      this.client.emit('debug', `[LazyManager] Tous les managers initialisés en ${Date.now() - startTime}ms`);
    }
  }

  /**
   * Nettoie les managers et libère la mémoire
   */
  destroy() {
    // Nettoyer les managers qui ont une méthode destroy
    for (const [name, manager] of this.managers) {
      if (typeof manager.destroy === 'function') {
        try {
          manager.destroy();
        } catch (error) {
          this.client.emit('debug', `[LazyManager] Erreur lors du nettoyage de ${name}: ${error.message}`);
        }
      }
    }

    this.managers.clear();
    this.factories.clear();
    this.initializationOrder = [];
  }

  /**
   * Retourne les statistiques actuelles
   * @returns {Object}
   */
  getStats() {
    return {
      ...this.stats,
      initializationRate:
        this.stats.totalManagers > 0 ? (this.stats.initializedManagers / this.stats.totalManagers) * 100 : 0,
      averageInitTime:
        this.stats.initializedManagers > 0 ? this.stats.initializationTime / this.stats.initializedManagers : 0,
      pendingManagers: this.stats.totalManagers - this.stats.initializedManagers,
    };
  }

  /**
   * Crée un getter proxy pour un manager
   * @param {string} name Nom du manager
   * @returns {Proxy}
   */
  createProxy(name) {
    return new Proxy(
      {},
      {
        get: (target, prop) => {
          const manager = this.get(name);
          return manager[prop];
        },
        has: (target, prop) => {
          const manager = this.get(name);
          return prop in manager;
        },
        ownKeys: () => {
          const manager = this.get(name);
          return Reflect.ownKeys(manager);
        },
        getOwnPropertyDescriptor: (target, prop) => {
          const manager = this.get(name);
          return Reflect.getOwnPropertyDescriptor(manager, prop);
        },
      },
    );
  }
}

module.exports = {
  LazyManagerRegistry,
};
