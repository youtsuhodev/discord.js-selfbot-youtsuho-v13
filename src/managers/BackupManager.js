'use strict';

const { Buffer } = require('node:buffer');
const { Collection } = require('@discordjs/collection');
const BaseManager = require('./BaseManager');
const backup = require('./backup');

/**
 * Manages in-memory guild backups
 */
class BackupCacheManager {
  /**
   * @param {BackupManager} manager Parent backup manager
   */
  constructor(manager) {
    /**
     * @type {BackupManager}
     * @private
     */
    this._manager = manager;

    /**
     * Cached backup data
     * @type {Collection<string, Object>}
     * @private
     */
    this._storage = new Collection();
  }

  /**
   * The client that instantiated this manager
   * @type {Client}
   */
  get client() {
    return this._manager.client;
  }

  /**
   * Resolve a guild from an ID
   * @param {Snowflake} guildId Guild ID
   * @returns {Guild}
   * @private
   */
  _resolveGuild(guildId) {
    const guild = this.client.guilds.resolve(guildId);
    if (!guild) {
      throw new Error(`Guild "${guildId}" could not be resolved.`);
    }
    return guild;
  }

  /**
   * Create a backup from a guild and store it in cache
   * @param {Snowflake} guildId Guild ID to backup
   * @param {Object} [options] Backup creation options
   * @returns {Promise<Object>} Backup data
   */
  async create(guildId, options = {}) {
    const guild = this._resolveGuild(guildId);
    const backupData = await backup.create(guild, options);
    this._storage.set(backupData.id, backupData);
    return backupData;
  }

  /**
   * Delete a backup from cache
   * @param {string} backupId Backup ID
   * @returns {boolean} Whether the backup existed
   */
  delete(backupId) {
    return this._storage.delete(backupId);
  }

  /**
   * Clear all cached backups
   */
  clearAll() {
    this._storage.clear();
  }

  /**
   * Load a cached backup into a guild
   * @param {Snowflake} guildId Target guild ID
   * @param {string} backupId Backup ID
   * @param {Object} [options] Load options
   * @returns {Promise<Object>} Restored backup data
   */
  async load(guildId, backupId, options = {}) {
    const guild = this._resolveGuild(guildId);
    const backupData = this._storage.get(backupId);

    if (!backupData) {
      throw new Error(`Backup "${backupId}" was not found in cache.`);
    }

    return backup.load(backupData, guild, options);
  }

  /**
   * Get a cached backup
   * @param {string} backupId Backup ID
   * @returns {Object|undefined} Backup info with data, id and size
   */
  get(backupId) {
    const backupData = this._storage.get(backupId);
    if (!backupData) return undefined;

    const size = Number((Buffer.byteLength(JSON.stringify(backupData), 'utf8') / 1024).toFixed(2));

    return {
      id: backupId,
      data: backupData,
      size,
    };
  }

  /**
   * List all cached backup IDs
   * @returns {string[]}
   */
  list() {
    return [...this._storage.keys()];
  }
}

/**
 * Manages guild backup operations
 * @extends {BaseManager}
 */
class BackupManager extends BaseManager {
  constructor(client) {
    super(client);

    /**
     * In-memory backup cache
     * @type {BackupCacheManager}
     */
    this.cache = new BackupCacheManager(this);
  }
}

module.exports = BackupManager;
