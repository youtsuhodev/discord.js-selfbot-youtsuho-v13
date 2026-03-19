'use strict';

const { EventBatcher } = require('./EventBatcher');

/**
 * Handler pour les événements batchés
 * Traite les lots d'événements pour maintenir la compatibilité
 */
class BatchEventHandler {
  constructor(client) {
    this.client = client;
    this.packetHandlers = null; // Sera initialisé plus tard
    
    // Écouter les événements batchés
    this.client.on('batched_events', this.handleBatchedEvents.bind(this));
  }

  /**
   * Initialise les handlers de packets
   * @param {Object} packetHandlers Les handlers de packets
   */
  init(packetHandlers) {
    this.packetHandlers = packetHandlers;
  }

  /**
   * Traite un lot d'événements batchés
   * @param {Array<Object>} events Le lot d'événements à traiter
   */
  handleBatchedEvents(events) {
    if (!this.packetHandlers) return;

    // Traiter chaque événement dans le batch
    for (const event of events) {
      const packet = {
        t: event.type,
        d: event.data,
      };

      const shard = {
        id: event.shardId,
      };

      // Appeler le handler approprié
      if (this.packetHandlers[event.type]) {
        try {
          this.packetHandlers[event.type](this.client, packet, shard);
        } catch (error) {
          this.client.emit('error', error);
        }
      }
    }
  }
}

module.exports = {
  BatchEventHandler,
};
