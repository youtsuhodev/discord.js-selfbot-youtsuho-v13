'use strict';

const { Buffer } = require('node:buffer');
const { setTimeout } = require('node:timers');
const { loadCategory, loadChannel } = require('./util');
const Permissions = require('../../util/Permissions');

/*
 * Restores the guild configuration
 * @param {Guild} guild
 * @param {Object} backupData
 * @returns {Promise<void>}
 */
async function loadConfig(guild, backupData) {
  const configPromises = [];

  if (backupData.name) configPromises.push(guild.setName(backupData.name));
  if (backupData.iconBase64) {
    configPromises.push(guild.setIcon(Buffer.from(backupData.iconBase64, 'base64')));
  } else if (backupData.iconURL) {
    configPromises.push(guild.setIcon(backupData.iconURL));
  }
  if (backupData.splashBase64) {
    configPromises.push(guild.setSplash(Buffer.from(backupData.splashBase64, 'base64')));
  } else if (backupData.splashURL) {
    configPromises.push(guild.setSplash(backupData.splashURL));
  }
  if (backupData.bannerBase64) {
    configPromises.push(guild.setBanner(Buffer.from(backupData.bannerBase64, 'base64')));
  } else if (backupData.bannerURL) {
    configPromises.push(guild.setBanner(backupData.bannerURL));
  }
  if (backupData.verificationLevel) {
    configPromises.push(guild.setVerificationLevel(backupData.verificationLevel));
  }
  if (backupData.defaultMessageNotifications) {
    configPromises.push(guild.setDefaultMessageNotifications(backupData.defaultMessageNotifications));
  }

  const changeableExplicitLevel = guild.features.includes('COMMUNITY');
  if (backupData.explicitContentFilter && changeableExplicitLevel) {
    configPromises.push(guild.setExplicitContentFilter(backupData.explicitContentFilter));
  }

  await Promise.all(configPromises);
}

/*
 * Restore the guild roles
 * @param {Guild} guild
 * @param {Object} backupData
 * @returns {Promise<void>}
 */
async function loadRoles(guild, backupData) {
  const rolePromises = [];

  backupData.roles.forEach(roleData => {
    if (roleData.isEveryone) {
      rolePromises.push(
        guild.roles.cache.get(guild.id).edit({
          name: roleData.name,
          colors: { primaryColor: roleData.color },
          permissions: BigInt(roleData.permissions),
          mentionable: roleData.mentionable,
        }),
      );
    } else {
      rolePromises.push(
        guild.roles.create({
          name: roleData.name,
          colors: { primaryColor: roleData.color },
          hoist: roleData.hoist,
          permissions: BigInt(roleData.permissions),
          mentionable: roleData.mentionable,
        }),
      );
    }
  });

  await Promise.all(rolePromises);
}

/*
 * Restore the guild channels
 * @param {Guild} guild
 * @param {Object} backupData
 * @param {Object} options
 * @returns {Promise<void>}
 */
async function loadChannels(guild, backupData, options) {
  const loadChannelPromises = [];

  backupData.channels.categories.forEach(categoryData => {
    if (!categoryData.name) return;

    loadChannelPromises.push(
      (async () => {
        try {
          const createdCategory = await loadCategory(categoryData, guild);
          await Promise.all(
            categoryData.children
              .filter(channelData => channelData.name)
              .map(channelData => loadChannel(channelData, guild, createdCategory, options)),
          );
        } catch {
          // Continue restoring other categories
        }
      })(),
    );
  });

  backupData.channels.others.forEach(channelData => {
    if (!channelData.name) return;
    loadChannelPromises.push(loadChannel(channelData, guild, null, options));
  });

  await Promise.all(loadChannelPromises);
}

/*
 * Restore the afk configuration
 * @param {Guild} guild
 * @param {Object} backupData
 * @returns {Promise<void>}
 */
async function loadAFK(guild, backupData) {
  if (!backupData.afk) return;

  await Promise.all([
    guild.setAFKChannel(guild.channels.cache.find(ch => ch.name === backupData.afk.name && ch.type === 'GUILD_VOICE')),
    guild.setAFKTimeout(backupData.afk.timeout),
  ]);
}

/*
 * Restore guild emojis
 * @param {Guild} guild
 * @param {Object} backupData
 * @returns {Promise<void>}
 */
async function loadEmojis(guild, backupData) {
  await Promise.all(
    backupData.emojis.map(emoji => {
      if (emoji.url) return guild.emojis.create(emoji.url, emoji.name);
      if (emoji.base64) return guild.emojis.create(Buffer.from(emoji.base64, 'base64'), emoji.name);
      return Promise.resolve();
    }),
  );
}

/*
 * Restore guild bans
 * @param {Guild} guild
 * @param {Object} backupData
 * @returns {Promise<void>}
 */
async function loadBans(guild, backupData) {
  await Promise.all(
    backupData.bans.map(ban =>
      guild.members.ban(ban.id, {
        reason: ban.reason,
      }),
    ),
  );
}

/*
 * Restore embed channel configuration
 * @param {Guild} guild
 * @param {Object} backupData
 * @returns {Promise<void>}
 */
async function loadEmbedChannel(guild, backupData) {
  if (!backupData.widget.channel) return;

  await guild.setWidgetSettings({
    enabled: backupData.widget.enabled,
    channel: guild.channels.cache.find(ch => ch.name === backupData.widget.channel),
  });
}

/*
 * Restore community settings
 * @param {Guild} guild
 * @param {Object} backupData
 * @returns {Promise<void>}
 */
async function loadCommunity(guild, backupData) {
  if (!backupData.community) return;

  const rulesChannelData =
    backupData.channels.categories
      .find(c => c.children.find(ch => ch.rulesChannel))
      ?.children.find(ch => ch.rulesChannel) || backupData.channels.others.find(c => c.rulesChannel);
  const publicUpdatesChannelData =
    backupData.channels.categories
      .find(c => c.children.find(ch => ch.publicUpdatesChannel))
      ?.children.find(ch => ch.publicUpdatesChannel) || backupData.channels.others.find(c => c.publicUpdatesChannel);

  try {
    const isCommunityEnabled = guild.features.includes('COMMUNITY');
    const shouldBeCommunityEnabled = backupData.community.enabled;

    if (shouldBeCommunityEnabled && !isCommunityEnabled) {
      const rulesChannel =
        rulesChannelData &&
        guild.channels.cache.find(ch => ch.name === rulesChannelData.name && ch.type === 'GUILD_TEXT');
      const publicUpdatesChannel =
        publicUpdatesChannelData &&
        guild.channels.cache
          .filter(
            ch => ch.name === publicUpdatesChannelData.name && ch.type === 'GUILD_TEXT' && ch.id !== rulesChannel?.id,
          )
          .first();

      if (rulesChannel && publicUpdatesChannel) {
        await guild.setCommunity(true, publicUpdatesChannel, rulesChannel, 'Backup');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } else if (shouldBeCommunityEnabled && isCommunityEnabled) {
      const currentRulesChannel = guild.rulesChannel;
      const currentPublicUpdatesChannel = guild.publicUpdatesChannel;

      const newRulesChannel = rulesChannelData && guild.channels.cache.find(ch => ch.name === rulesChannelData.name);
      const newPublicUpdatesChannel =
        publicUpdatesChannelData && guild.channels.cache.find(ch => ch.name === publicUpdatesChannelData.name);

      const rulesChannelChanged = newRulesChannel && currentRulesChannel?.id !== newRulesChannel.id;
      const updatesChannelChanged =
        newPublicUpdatesChannel && currentPublicUpdatesChannel?.id !== newPublicUpdatesChannel.id;

      if ((rulesChannelChanged || updatesChannelChanged) && newRulesChannel && newPublicUpdatesChannel) {
        await guild.setRulesChannel(newRulesChannel.id).catch(() => false);
        await guild.setPublicUpdatesChannel(newPublicUpdatesChannel.id).catch(() => false);
        currentPublicUpdatesChannel?.delete().catch(() => false);
        currentRulesChannel?.delete().catch(() => false);
      }
    } else if (!shouldBeCommunityEnabled && isCommunityEnabled) {
      await guild.setCommunity(false, null, null, 'Backup');
    }
  } catch {
    // Ignore community restore errors
  }
}

/*
 * Restore role channel permissions
 * @param {Guild} guild
 * @param {Object} backupData
 * @returns {Promise<void>}
 */
async function loadRoleChannelPermissions(guild, backupData) {
  for (const roleData of backupData.roles) {
    if (!roleData.channelPermissions) continue;

    let role = guild.roles.cache.find(r => r.name === roleData.name);
    if (!role && roleData.isEveryone) role = guild.roles.cache.get(guild.id);
    if (!role) continue;

    for (const [channelName, permissions] of Object.entries(roleData.channelPermissions)) {
      const channel = guild.channels.cache.find(c => c.name === channelName);
      if (!channel) continue;

      try {
        await channel.permissionOverwrites.edit(role.id, {
          allow: Permissions.resolve(permissions.allow),
          deny: Permissions.resolve(permissions.deny),
        });
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch {
        // Continue with next permission
      }
    }
  }
}

module.exports = {
  loadConfig,
  loadRoles,
  loadChannels,
  loadAFK,
  loadEmojis,
  loadBans,
  loadEmbedChannel,
  loadCommunity,
  loadRoleChannelPermissions,
};
