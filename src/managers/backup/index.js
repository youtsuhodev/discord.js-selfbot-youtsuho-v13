'use strict';

const { setTimeout } = require('node:timers');
const createMaster = require('./create');
const loadMaster = require('./load');
const { clearGuild, fetchBuffer } = require('./util');
const SnowflakeUtil = require('../../util/SnowflakeUtil');

/*
 * Creates a guild backup
 * @param {Guild} guild
 * @param {Object} [options] Backup options
 * @returns {Promise<Object>}
 */
async function create(guild, options = {}) {
  const normalizedOptions = {
    maxMessagesPerChannel: 10,
    doNotBackup: ['bans', 'emojis'],
    backupMembers: false,
    saveImages: '',
    ...options,
    backupID: options.backupID ?? options.backupId ?? null,
  };

  const backupData = {
    name: guild.name,
    verificationLevel: guild.verificationLevel,
    explicitContentFilter: guild.explicitContentFilter,
    defaultMessageNotifications: guild.defaultMessageNotifications,
    afk: guild.afkChannel ? { name: guild.afkChannel.name, timeout: guild.afkTimeout } : null,
    widget: {
      enabled: guild.widgetEnabled,
      channel: guild.widgetChannel ? guild.widgetChannel.name : null,
    },
    community: {
      enabled: guild.features.includes('COMMUNITY'),
      systemChannelFlags: guild.systemChannelFlags ? guild.systemChannelFlags.bitfield : null,
      systemChannelId: guild.systemChannelId,
      rulesChannelId: guild.rulesChannelId,
      publicUpdatesChannelId: guild.publicUpdatesChannelId,
      safetyAlertsChannelId: guild.safetyAlertsChannelId || null,
    },
    channels: { categories: [], others: [] },
    roles: [],
    bans: [],
    emojis: [],
    members: [],
    createdTimestamp: Date.now(),
    guildID: guild.id,
    id: normalizedOptions.backupID ?? SnowflakeUtil.generate(Date.now()),
  };

  if (guild.iconURL()) {
    if (normalizedOptions.saveImages === 'base64') {
      backupData.iconBase64 = (await fetchBuffer(guild.iconURL({ dynamic: true }))).toString('base64');
    }
    backupData.iconURL = guild.iconURL({ dynamic: true });
  }

  if (guild.splashURL()) {
    if (normalizedOptions.saveImages === 'base64') {
      backupData.splashBase64 = (await fetchBuffer(guild.splashURL())).toString('base64');
    }
    backupData.splashURL = guild.splashURL();
  }

  if (guild.bannerURL()) {
    if (normalizedOptions.saveImages === 'base64') {
      backupData.bannerBase64 = (await fetchBuffer(guild.bannerURL())).toString('base64');
    }
    backupData.bannerURL = guild.bannerURL();
  }

  if (normalizedOptions.backupMembers) {
    backupData.members = await createMaster.getMembers(guild);
  }

  if (!normalizedOptions.doNotBackup.includes('bans')) {
    backupData.bans = await createMaster.getBans(guild);
  }

  if (!normalizedOptions.doNotBackup.includes('roles')) {
    backupData.roles = await createMaster.getRoles(guild);
  }

  if (!normalizedOptions.doNotBackup.includes('emojis')) {
    backupData.emojis = await createMaster.getEmojis(guild, normalizedOptions);
  }

  if (!normalizedOptions.doNotBackup.includes('channels')) {
    backupData.channels = await createMaster.getChannels(guild, normalizedOptions);
  }

  return backupData;
}

/*
 * Loads a backup into a guild
 * @param {Object} backupData
 * @param {Guild} guild
 * @param {Object} [options] Load options
 * @returns {Promise<Object>}
 */
async function load(backupData, guild, options = {}) {
  if (!guild) throw new Error('Invalid guild');

  const normalizedOptions = {
    clearGuildBeforeRestore: true,
    maxMessagesPerChannel: 10,
    ...options,
  };

  if (normalizedOptions.clearGuildBeforeRestore) {
    await clearGuild(guild);
  }

  await Promise.all([loadMaster.loadConfig(guild, backupData), loadMaster.loadRoles(guild, backupData)]);
  await new Promise(resolve => setTimeout(resolve, 3000));
  await loadMaster.loadChannels(guild, backupData, normalizedOptions);

  const restorePromises = [loadMaster.loadAFK(guild, backupData), loadMaster.loadEmbedChannel(guild, backupData)];

  if (!normalizedOptions.doNotBackup?.includes('emojis')) {
    restorePromises.push(loadMaster.loadEmojis(guild, backupData));
  }

  if (!normalizedOptions.doNotBackup?.includes('bans')) {
    restorePromises.push(loadMaster.loadBans(guild, backupData));
  }

  await Promise.all(restorePromises);
  await loadMaster.loadCommunity(guild, backupData);
  await loadMaster.loadRoleChannelPermissions(guild, backupData);

  return backupData;
}

module.exports = {
  create,
  load,
};
