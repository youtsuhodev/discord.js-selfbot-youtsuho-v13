'use strict';

const { Buffer } = require('node:buffer');
const { fetch } = require('undici');

const MaxBitratePerTier = {
  NONE: 64_000,
  TIER_1: 128_000,
  TIER_2: 256_000,
  TIER_3: 384_000,
};

/*
 * @param {string} url
 * @returns {Promise<Buffer>}
 */
async function fetchBuffer(url) {
  const response = await fetch(url);
  return Buffer.from(await response.arrayBuffer());
}

/*
 * Gets the permissions for a channel
 * @param {GuildChannel} channel
 * @returns {Object[]}
 */
function fetchChannelPermissions(channel) {
  const permissions = [];

  channel.permissionOverwrites?.cache
    .filter(p => p.type === 'role')
    .forEach(perm => {
      const role = channel.guild.roles.cache.get(perm.id);
      if (role) {
        permissions.push({
          roleName: role.name,
          allow: perm.allow.bitfield.toString(),
          deny: perm.deny.bitfield.toString(),
        });
      }
    });

  return permissions;
}

/*
 * Fetches voice channel data for backup
 * @param {GuildChannel} channel
 * @returns {Promise<Object>}
 */
async function fetchVoiceChannelData(channel) {
  return {
    type: 'GUILD_VOICE',
    name: channel.name,
    bitrate: channel.bitrate,
    userLimit: channel.userLimit,
    parent: channel.parent ? channel.parent.name : null,
    permissions: fetchChannelPermissions(channel),
  };
}

/*
 * Fetches messages from a channel
 * @param {TextBasedChannel} channel
 * @param {Object} options
 * @returns {Promise<Object[]>}
 */
async function fetchChannelMessages(channel, options) {
  const messages = [];
  const maxMessages = Number.isNaN(options.maxMessagesPerChannel) ? 10 : options.maxMessagesPerChannel;
  const fetchOptions = { limit: 100 };
  let lastMessageId;
  const imageRegex = /\.(png|jpg|jpeg|jpe|jif|jfif|jfi)$/i;

  while (messages.length < maxMessages) {
    if (lastMessageId) fetchOptions.before = lastMessageId;

    const fetched = await channel.messages.fetch(fetchOptions);
    if (fetched.size === 0) break;

    lastMessageId = fetched.last().id;

    for (const msg of fetched.values()) {
      if (messages.length >= maxMessages) break;
      if (!msg.author) continue;

      const files = await Promise.all(
        msg.attachments.map(async attachment => {
          let attach = attachment.url;

          if (options.saveImages === 'base64' && imageRegex.test(attachment.url)) {
            try {
              attach = (await fetchBuffer(attachment.url)).toString('base64');
            } catch (error) {
              console.error(`Failed to fetch attachment ${attachment.url}:`, error);
            }
          }

          return { name: attachment.name, attachment: attach };
        }),
      );

      messages.push({
        username: msg.author.username,
        avatar: msg.author.displayAvatarURL(),
        content: msg.cleanContent,
        embeds: msg.embeds,
        files,
        pinned: msg.pinned,
        sentAt: msg.createdAt.toISOString(),
      });
    }

    if (fetched.size < 100) break;
  }

  return messages;
}

/*
 * Fetches text channel data for backup
 * @param {GuildChannel} channel
 * @param {Object} options
 * @returns {Promise<Object>}
 */
async function fetchTextChannelData(channel, options) {
  const channelData = {
    type: channel.type,
    name: channel.name,
    nsfw: channel.nsfw,
    rateLimitPerUser: channel.type === 'GUILD_TEXT' ? channel.rateLimitPerUser : undefined,
    parent: channel.parent ? channel.parent.name : null,
    topic: channel.topic,
    permissions: fetchChannelPermissions(channel),
    messages: [],
    isNews: channel.type === 'GUILD_NEWS',
    rulesChannel: channel.guild.rulesChannelId === channel.id,
    publicUpdatesChannel: channel.guild.publicUpdatesChannelId === channel.id,
    threads: [],
  };

  if (channel.threads.cache.size > 0) {
    await Promise.all(
      channel.threads.cache.map(async thread => {
        const threadData = {
          type: thread.type,
          name: thread.name,
          archived: thread.archived,
          autoArchiveDuration: thread.autoArchiveDuration,
          locked: thread.locked,
          rateLimitPerUser: thread.rateLimitPerUser,
          messages: [],
        };

        try {
          threadData.messages = await fetchChannelMessages(thread, options);
        } catch {
          // Keep empty messages on failure
        }

        channelData.threads.push(threadData);
      }),
    );
  }

  try {
    channelData.messages = await fetchChannelMessages(channel, options);
  } catch {
    // Keep empty messages on failure
  }

  return channelData;
}

/*
 * Creates a category for the guild
 * @param {Object} categoryData
 * @param {Guild} guild
 * @returns {Promise<GuildChannel>}
 */
async function loadCategory(categoryData, guild) {
  const category = await guild.channels.create(categoryData.name, { type: 'GUILD_CATEGORY' });
  const finalPermissions = [];

  categoryData.permissions.forEach(perm => {
    const role = guild.roles.cache.find(r => r.name === perm.roleName);
    if (role) {
      finalPermissions.push({
        id: role.id,
        allow: BigInt(perm.allow),
        deny: BigInt(perm.deny),
      });
    }
  });

  await category.permissionOverwrites.set(finalPermissions);
  return category;
}

/*
 * Create a channel and returns it
 * @param {Object} channelData
 * @param {Guild} guild
 * @param {GuildChannel|null} category
 * @param {Object} options
 * @returns {Promise<GuildChannel|undefined>}
 */
async function loadChannel(channelData, guild, category, options) {
  const loadMessages = async (channel, messages, previousWebhook) => {
    const webhook =
      previousWebhook ||
      (await channel
        .createWebhook('MessagesBackup', {
          avatar: channel.client.user.displayAvatarURL(),
        })
        .catch(() => null));

    if (!webhook) return undefined;

    messages = messages.filter(m => m.content.length > 0 || m.embeds.length > 0 || m.files.length > 0).reverse();
    messages = messages.slice(messages.length - options.maxMessagesPerChannel);

    for (const msg of messages) {
      const sentMsg = await webhook
        .send({
          content: msg.content.length ? msg.content : undefined,
          username: msg.username,
          avatarURL: msg.avatar,
          embeds: msg.embeds,
          files: msg.files,
          allowedMentions: options.allowedMentions,
          threadId: channel.isThread() ? channel.id : undefined,
        })
        .catch(err => {
          console.log(err.message);
        });

      if (msg.pinned && sentMsg) await sentMsg.pin();
    }

    return webhook;
  };

  const createOptions = {
    type: null,
    parent: category,
  };

  if (channelData.type === 'GUILD_TEXT' || channelData.type === 'GUILD_NEWS') {
    createOptions.topic = channelData.topic;
    createOptions.nsfw = channelData.nsfw;
    createOptions.rateLimitPerUser = channelData.rateLimitPerUser;
    createOptions.type = channelData.isNews && guild.features.includes('NEWS') ? 'GUILD_NEWS' : 'GUILD_TEXT';
  } else if (channelData.type === 'GUILD_VOICE') {
    let bitrate = channelData.bitrate;
    const bitrates = Object.values(MaxBitratePerTier);

    while (bitrate > MaxBitratePerTier[guild.premiumTier]) {
      bitrate = bitrates[Object.keys(MaxBitratePerTier).indexOf(guild.premiumTier) - 1];
    }

    createOptions.bitrate = bitrate;
    createOptions.userLimit = channelData.userLimit;
    createOptions.type = 'GUILD_VOICE';
  }

  const channel = await guild.channels.create(channelData.name, createOptions);

  if (channelData.rulesChannel) {
    try {
      const oldRules = guild.rulesChannel;
      await guild.setRulesChannel(channel.id);
      if (oldRules) await guild.client.api.channels(oldRules.id).delete();
    } catch {
      // Ignore community channel errors
    }
  }

  if (channelData.publicUpdatesChannel) {
    try {
      const oldPublic = guild.publicUpdatesChannel;
      await guild.setPublicUpdatesChannel(channel.id);
      if (oldPublic) await guild.client.api.channels(oldPublic.id).delete();
    } catch {
      // Ignore community channel errors
    }
  }

  const finalPermissions = [];

  channelData.permissions.forEach(perm => {
    const role = guild.roles.cache.find(r => r.name === perm.roleName);
    if (role) {
      finalPermissions.push({
        id: role.id,
        allow: BigInt(perm.allow),
        deny: BigInt(perm.deny),
      });
    }
  });

  await channel.permissionOverwrites.set(finalPermissions);

  if (channelData.type === 'GUILD_TEXT') {
    let webhook;
    if (channelData.messages.length > 0) {
      webhook = await loadMessages(channel, channelData.messages).catch(() => null);
    }

    if (channelData.threads.length > 0) {
      await Promise.all(
        channelData.threads.map(async threadData => {
          let autoArchiveDuration = threadData.autoArchiveDuration;
          if (!guild.features.includes('SEVEN_DAY_THREAD_ARCHIVE') && autoArchiveDuration === 10_080) {
            autoArchiveDuration = 4320;
          }
          if (!guild.features.includes('THREE_DAY_THREAD_ARCHIVE') && autoArchiveDuration === 4320) {
            autoArchiveDuration = 1440;
          }

          const thread = await channel.threads.create({
            name: threadData.name,
            autoArchiveDuration,
          });

          if (webhook) await loadMessages(thread, threadData.messages, webhook);
        }),
      );
    }
  }

  return channel;
}

/*
 * Delete all roles, channels, emojis, etc. of a guild
 * @param {Guild} guild
 * @returns {Promise<void>}
 */
async function clearGuild(guild) {
  guild.roles.cache
    .filter(role => !role.managed && role.editable && role.id !== guild.id)
    .forEach(role => {
      role.delete().catch(() => {});
    });

  guild.channels.cache.forEach(channel => {
    channel.delete().catch(() => {});
  });

  guild.emojis.cache.forEach(emoji => {
    emoji.delete().catch(() => {});
  });

  const webhooks = await guild.fetchWebhooks().catch(() => null);
  if (webhooks) {
    webhooks.forEach(webhook => {
      webhook.delete().catch(() => {});
    });
  }

  const bans = await guild.bans.fetch({ limit: 99 });
  bans.forEach(ban => {
    guild.members.unban(ban.user).catch(() => {});
  });

  guild.setAFKChannel(null);
  guild.setAFKTimeout(60 * 5);
  guild.setIcon(null);
  guild.setBanner(null).catch(() => {});
  guild.setSplash(null).catch(() => {});
  guild.setDefaultMessageNotifications('ONLY_MENTIONS');
  guild.setWidgetSettings({
    enabled: false,
    channel: null,
  });

  if (!guild.features.includes('COMMUNITY')) {
    guild.setExplicitContentFilter('DISABLED');
    guild.setVerificationLevel('NONE');
  }

  guild.setSystemChannel(null);
  guild.setSystemChannelFlags([
    'SUPPRESS_GUILD_REMINDER_NOTIFICATIONS',
    'SUPPRESS_JOIN_NOTIFICATIONS',
    'SUPPRESS_PREMIUM_SUBSCRIPTIONS',
  ]);
}

module.exports = {
  fetchBuffer,
  fetchChannelPermissions,
  fetchVoiceChannelData,
  fetchChannelMessages,
  fetchTextChannelData,
  loadCategory,
  loadChannel,
  clearGuild,
};
