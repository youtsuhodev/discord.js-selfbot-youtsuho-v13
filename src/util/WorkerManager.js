'use strict';

const { EventEmitter } = require('node:events');
const path = require('node:path');
const { setTimeout } = require('node:timers');
const { Worker } = require('node:worker_threads');

/**
 * Types d'opérations supportées par les workers
 */
const OperationTypes = {
  IMAGE_PROCESSING: 'image_processing',
  ENCRYPTION: 'encryption',
  DECRYPTION: 'decryption',
  DATA_COMPRESSION: 'data_compression',
  DATA_DECOMPRESSION: 'data_decompression',
  JSON_PARSE: 'json_parse',
  JSON_STRINGIFY: 'json_stringify',
  VALIDATION: 'validation',
  CALCULATION: 'calculation',
};

/**
 * Pool de workers pour les opérations CPU-intensives
 * Gère un ensemble de workers pour répartir la charge de travail
 */
class WorkerPool extends EventEmitter {
  /**
   * @param {Object} [options] Options de configuration
   * @param {number} [options.size=2] Nombre de workers dans le pool
   * @param {number} [options.maxTasks=100] Nombre maximum de tâches en attente
   * @param {number} [options.taskTimeout=30000] Timeout par défaut pour les tâches (ms)
   * @param {string} [options.workerScript] Script worker personnalisé
   */
  constructor(options = {}) {
    super();

    this.size = options.size || Math.min(4, require('node:os').cpus().length);
    this.maxTasks = options.maxTasks || 100;
    this.taskTimeout = options.taskTimeout || 30000;
    this.workerScript = options.workerScript || path.join(__dirname, 'default-worker.js');

    this.workers = [];
    this.taskQueue = [];
    this.busyWorkers = new Set();
    this.taskId = 0;
    this.pendingTasks = new Map();

    this.stats = {
      totalTasks: 0,
      completedTasks: 0,
      failedTasks: 0,
      averageExecutionTime: 0,
      totalExecutionTime: 0,
      workersUtilization: 0,
      queueSize: 0,
    };

    this._initializeWorkers();
  }

  /**
   * Initialise les workers du pool
   * @private
   */
  _initializeWorkers() {
    for (let i = 0; i < this.size; i++) {
      const worker = new Worker(this.workerScript);

      worker.on('message', result => {
        this._handleWorkerMessage(worker, result);
      });

      worker.on('error', error => {
        this._handleWorkerError(worker, error);
      });

      worker.on('exit', code => {
        if (code !== 0) {
          this.emit('error', new Error(`Worker stopped with exit code ${code}`));
          this._replaceWorker(worker);
        }
      });

      this.workers.push({
        worker,
        id: i,
        busy: false,
        currentTask: null,
      });
    }
  }

  /**
   * Exécute une tâche dans un worker disponible
   * @param {string} type Type d'opération
   * @param {*} data Données pour la tâche
   * @param {Object} [options] Options de la tâche
   * @returns {Promise<*>} Résultat de la tâche
   */
  async execute(type, data, options = {}) {
    return new Promise((resolve, reject) => {
      const taskId = ++this.taskId;
      const timeout = options.timeout || this.taskTimeout;

      // Vérifier si la file d'attente est pleine
      if (this.taskQueue.length >= this.maxTasks) {
        reject(new Error("File d'attente de tâches pleine"));
        return;
      }

      const task = {
        id: taskId,
        type,
        data,
        options,
        resolve,
        reject,
        startTime: Date.now(),
        timeout: setTimeout(() => {
          this._handleTaskTimeout(taskId);
        }, timeout),
      };

      this.taskQueue.push(task);
      this.pendingTasks.set(taskId, task);
      this.stats.totalTasks++;
      this.stats.queueSize = this.taskQueue.length;

      this._processQueue();
    });
  }

  /**
   * Traite la file d'attente des tâches
   * @private
   */
  _processQueue() {
    if (this.taskQueue.length === 0) return;

    const availableWorker = this.workers.find(w => !w.busy);
    if (!availableWorker) return;

    const task = this.taskQueue.shift();
    this.stats.queueSize = this.taskQueue.length;

    availableWorker.busy = true;
    availableWorker.currentTask = task;
    this.busyWorkers.add(availableWorker);

    // Envoyer la tâche au worker
    availableWorker.worker.postMessage({
      id: task.id,
      type: task.type,
      data: task.data,
      options: task.options,
    });
  }

  /**
   * Gère les messages des workers
   * @param {Object} workerInfo Informations du worker
   * @param {Object} result Résultat du worker
   * @private
   */
  _handleWorkerMessage(workerInfo, result) {
    const task = workerInfo.currentTask;
    if (!task) return;

    clearTimeout(task.timeout);
    this.pendingTasks.delete(task.id);

    const executionTime = Date.now() - task.startTime;
    this.stats.completedTasks++;
    this.stats.totalExecutionTime += executionTime;
    this.stats.averageExecutionTime = this.stats.totalExecutionTime / this.stats.completedTasks;

    // Libérer le worker
    workerInfo.busy = false;
    workerInfo.currentTask = null;
    this.busyWorkers.delete(workerInfo);
    this.stats.workersUtilization = (this.busyWorkers.size / this.size) * 100;

    if (result.success) {
      task.resolve(result.data);
    } else {
      task.reject(new Error(result.error));
      this.stats.failedTasks++;
    }

    // Traiter la prochaine tâche
    this._processQueue();
  }

  /**
   * Gère les erreurs des workers
   * @param {Object} workerInfo Informations du worker
   * @param {Error} error Erreur survenue
   * @private
   */
  _handleWorkerError(workerInfo, error) {
    const task = workerInfo.currentTask;
    if (task) {
      clearTimeout(task.timeout);
      this.pendingTasks.delete(task.id);
      task.reject(error);
      this.stats.failedTasks++;
    }

    // Remplacer le worker défaillant
    this._replaceWorker(workerInfo);
  }

  /**
   * Gère le timeout des tâches
   * @param {number} taskId ID de la tâche
   * @private
   */
  _handleTaskTimeout(taskId) {
    const task = this.pendingTasks.get(taskId);
    if (!task) return;

    task.reject(new Error(`Tâche ${taskId} timeout après ${this.taskTimeout}ms`));
    this.pendingTasks.delete(taskId);
    this.stats.failedTasks++;

    // Libérer le worker
    const workerInfo = this.workers.find(w => w.currentTask?.id === taskId);
    if (workerInfo) {
      workerInfo.busy = false;
      workerInfo.currentTask = null;
      this.busyWorkers.delete(workerInfo);
      this._processQueue();
    }
  }

  /**
   * Remplace un worker défaillant
   * @param {Object} oldWorkerInfo Ancien worker à remplacer
   * @private
   */
  _replaceWorker(oldWorkerInfo) {
    const index = this.workers.indexOf(oldWorkerInfo);
    if (index === -1) return;

    // Créer un nouveau worker
    const newWorker = new Worker(this.workerScript);
    newWorker.on('message', result => this._handleWorkerMessage(this.workers[index], result));
    newWorker.on('error', error => this._handleWorkerError(this.workers[index], error));
    newWorker.on('exit', code => {
      if (code !== 0) this._replaceWorker(this.workers[index]);
    });

    // Remplacer l'ancien worker
    oldWorkerInfo.worker.terminate();
    this.workers[index] = {
      ...oldWorkerInfo,
      worker: newWorker,
      busy: false,
      currentTask: null,
    };
  }

  /**
   * Arrête tous les workers
   */
  async destroy() {
    // Annuler toutes les tâches en attente
    for (const task of this.pendingTasks.values()) {
      clearTimeout(task.timeout);
      task.reject(new Error('Worker pool détruit'));
    }

    // Arrêter les workers
    await Promise.all(this.workers.map(w => w.worker.terminate()));

    this.workers = [];
    this.taskQueue = [];
    this.busyWorkers.clear();
    this.pendingTasks.clear();
  }

  /**
   * Retourne les statistiques actuelles
   * @returns {Object}
   */
  getStats() {
    return {
      ...this.stats,
      successRate:
        this.stats.totalTasks > 0 ? `${((this.stats.completedTasks / this.stats.totalTasks) * 100).toFixed(2)}%` : '0%',
      poolSize: this.size,
      busyWorkers: this.busyWorkers.size,
      availableWorkers: this.size - this.busyWorkers.size,
    };
  }
}

/**
 * Gestionnaire principal des workers pour le client Discord
 */
class WorkerManager extends EventEmitter {
  constructor(client) {
    super();
    this.client = client;
    this.pools = new Map();

    // Pool par défaut pour les opérations générales
    this.defaultPool = new WorkerPool({
      size: Math.min(4, require('node:os').cpus().length),
      maxTasks: 200,
    });

    this.defaultPool.on('error', error => {
      this.client.emit('error', error);
    });
  }

  /**
   * Exécute une tâche dans le pool par défaut
   * @param {string} type Type d'opération
   * @param {*} data Données
   * @param {Object} [options] Options
   * @returns {Promise<*>}
   */
  async execute(type, data, options = {}) {
    return this.defaultPool.execute(type, data, options);
  }

  /**
   * Crée un pool spécialisé
   * @param {string} name Nom du pool
   * @param {Object} options Options du pool
   * @returns {WorkerPool}
   */
  createPool(name, options) {
    const pool = new WorkerPool(options);
    pool.on('error', error => {
      this.client.emit('error', error);
    });
    this.pools.set(name, pool);
    return pool;
  }

  /**
   * Récupère un pool spécifique
   * @param {string} name Nom du pool
   * @returns {WorkerPool}
   */
  getPool(name) {
    return this.pools.get(name) || this.defaultPool;
  }

  /**
   * Nettoie tous les pools
   */
  async destroy() {
    await this.defaultPool.destroy();
    for (const pool of this.pools.values()) {
      await pool.destroy();
    }
    this.pools.clear();
  }

  /**
   * Retourne les statistiques de tous les pools
   * @returns {Object}
   */
  getStats() {
    const stats = {
      default: this.defaultPool.getStats(),
      pools: {},
    };

    for (const [name, pool] of this.pools) {
      stats.pools[name] = pool.getStats();
    }

    return stats;
  }
}

module.exports = {
  WorkerPool,
  WorkerManager,
  OperationTypes,
};
