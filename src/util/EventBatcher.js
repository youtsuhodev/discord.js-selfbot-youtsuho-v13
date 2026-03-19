'use strict';

const { setTimeout } = require('node:timers');

/**
 * Événements qui peuvent être batchés (événements fréquents)
 */
const BATCHABLE_EVENTS = new Set([
  'TYPING_START',
  'PRESENCE_UPDATE',
  'VOICE_STATE_UPDATE',
  'GUILD_MEMBER_UPDATE',
  'MESSAGE_REACTION_ADD',
  'MESSAGE_REACTION_REMOVE',
  'MESSAGE_REACTION_REMOVE_ALL',
  'MESSAGE_REACTION_REMOVE_EMOJI',
]);

/**
 * Événements qui ne doivent JAMAIS être batchés (critiques)
 */
const CRITICAL_EVENTS = new Set([
  'READY',
  'RESUMED',
  'GUILD_CREATE',
  'GUILD_DELETE',
  'CHANNEL_CREATE',
  'CHANNEL_DELETE',
  'MESSAGE_CREATE',
  'MESSAGE_DELETE',
  'MESSAGE_DELETE_BULK',
  'INTERACTION_CREATE',
]);

/**
 * Gère le batching des événements WebSocket pour optimiser les performances
 * Accumule les événements fréquents et les émet par lots pour réduire la surcharge
 */
class EventBatcher {
  /**
   * @param {Client} client Le client Discord
   * @param {Object} [options] Options de configuration
   * @param {number} [options.batchSize=50] Taille maximale d'un batch
   * @param {number} [options.flushInterval=100] Intervalle de flush en ms
   * @param {number} [options.maxBatchAge=50] Âge maximum d'un batch en ms
   */
  constructor(client, options = {}) {
    this.client = client;
    this.batchSize = options.batchSize || 50;
    this.flushInterval = options.flushInterval || 100;
    this.maxBatchAge = options.maxBatchAge || 50;

    /**
     * Batch actif en cours de remplissage
     * @type {Array<Object>}
     * @private
     */
    this.currentBatch = [];

    /**
     * Timestamp de création du batch actuel
     * @type {number}
     * @private
     */
    this.batchCreatedAt = Date.now();

    /**
     * Timer pour le flush automatique
     * @type {?NodeJS.Timeout}
     * @private
     */
    this.flushTimer = null;

    /**
     * Statistiques de performance
     * @type {Object}
     */
    this.stats = {
      totalEvents: 0,
      batchedEvents: 0,
      batchesFlushed: 0,
      averageBatchSize: 0,
      startTime: Date.now(),
    };

    this._startFlushTimer();
  }

  /**
   * Démarre le timer de flush automatique
   * @private
   */
  _startFlushTimer() {
    this.flushTimer = setTimeout(() => {
      this.flush();
      this._startFlushTimer();
    }, this.flushInterval).unref();
  }

  /**
   * Ajoute un événement au batch si possible, sinon l'émet immédiatement
   * @param {string} eventType Type de l'événement
   * @param {Object} data Données de l'événement
   * @param {number} shardId ID du shard
   * @returns {boolean} true si l'événement a été batché, false si émis immédiatement
   */
  addEvent(eventType, data, shardId) {
    this.stats.totalEvents++;

    // Les événements critiques ne sont jamais batchés
    if (CRITICAL_EVENTS.has(eventType)) {
      this._emitImmediate(eventType, data, shardId);
      return false;
    }

    // Les événements batchables sont accumulés
    if (BATCHABLE_EVENTS.has(eventType)) {
      const event = {
        type: eventType,
        data,
        shardId,
        timestamp: Date.now(),
      };

      this.currentBatch.push(event);
      this.stats.batchedEvents++;

      // Flush immédiat si le batch est plein
      if (this.currentBatch.length >= this.batchSize) {
        this.flush();
        return true;
      }

      // Flush si le batch est trop vieux
      if (Date.now() - this.batchCreatedAt > this.maxBatchAge) {
        this.flush();
        return true;
      }

      return true;
    }

    // Les autres événements sont émis immédiatement
    this._emitImmediate(eventType, data, shardId);
    return false;
  }

  /**
   * Émet un événement immédiatement sans batching
   * @private
   */
  _emitImmediate(eventType, data, shardId) {
    this.client.emit(eventType, data, shardId);
  }

  /**
   * Vide le batch actuel et émet tous les événements accumulés
   */
  flush() {
    if (this.currentBatch.length === 0) return;

    const batch = this.currentBatch.splice(0);
    this.batchCreatedAt = Date.now();

    // Mettre à jour les statistiques
    this.stats.batchesFlushed++;
    this.stats.averageBatchSize = 
      (this.stats.averageBatchSize * (this.stats.batchesFlushed - 1) + batch.length) / 
      this.stats.batchesFlushed;

    // Émettre le batch
    this.client.emit('batched_events', batch);

    // Émettre aussi les événements individuels pour compatibilité
    for (const event of batch) {
      this._emitImmediate(event.type, event.data, event.shardId);
    }

    // Log de performance en mode debug
    if (this.client.options?.debug) {
      this.client.emit('debug', 
        `[EventBatcher] Flush: ${batch.length} events | ` +
        `Avg batch size: ${this.stats.averageBatchSize.toFixed(2)} | ` +
        `Efficiency: ${((this.stats.batchedEvents / this.stats.totalEvents) * 100).toFixed(1)}%`
      );
    }
  }

  /**
   * Arrête le batcher et nettoie les ressources
   */
  destroy() {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }
    
    // Flush final pour ne pas perdre d'événements
    this.flush();
  }

  /**
   * Retourne les statistiques de performance actuelles
   * @returns {Object} Statistiques détaillées
   */
  getStats() {
    const runtime = Date.now() - this.stats.startTime;
    return {
      ...this.stats,
      runtime,
      eventsPerSecond: (this.stats.totalEvents / runtime) * 1000,
      batchingEfficiency: this.stats.totalEvents > 0 
        ? (this.stats.batchedEvents / this.stats.totalEvents) * 100 
        : 0,
      currentBatchSize: this.currentBatch.length,
    };
  }

  /**
   * Réinitialise les statistiques
   */
  resetStats() {
    this.stats = {
      totalEvents: 0,
      batchedEvents: 0,
      batchesFlushed: 0,
      averageBatchSize: 0,
      startTime: Date.now(),
    };
  }
}

module.exports = {
  EventBatcher,
  BATCHABLE_EVENTS,
  CRITICAL_EVENTS,
};
