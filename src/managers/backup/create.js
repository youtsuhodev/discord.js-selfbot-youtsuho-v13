'use strict';

const { fetchChannelPermissions, fetchTextChannelData, fetchVoiceChannelData, fetchBuffer } = require('./util');

/*
 * Returns banned members of the guild
 * @param {Guild} guild
 * @returns {Promise<Object[]>}
 */
async function getBans(guild) {
  const bans = [];
  const cases = await guild.bans.fetch();

  cases.forEach(ban => {
    bans.push({
      id: ban.user.id,
      reason: ban.reason,
    });
  });

  return bans;
}

/*
 * Returns members of the guild
 * @param {Guild} guild
 * @returns {Promise<Object[]>}
 */
async function getMembers(guild) {
  const members = [];

  guild.members.cache.forEach(member => {
    members.push({
      userId: member.user.id,
      username: member.user.username,
      discriminator: member.user.discriminator,
      avatarUrl: member.user.avatarURL(),
      joinedTimestamp: member.joinedTimestamp,
      roles: member.roles.cache.map(role => role.id),
      bot: member.user.bot,
    });
  });

  return members;
}

/*
 * Returns roles of the guild
 * @param {Guild} guild
 * @returns {Promise<Object[]>}
 */
async function getRoles(guild) {
  const roles = [];

  guild.roles.cache
    .filter(role => !role.managed)
    .sort((a, b) => b.position - a.position)
    .forEach(role => {
      roles.push({
        oldId: role.id,
        name: role.name,
        color: role.hexColor,
        hoist: role.hoist,
        permissions: role.permissions.bitfield.toString(),
        mentionable: role.mentionable,
        position: role.position,
        isEveryone: guild.id === role.id,
      });
    });

  return roles;
}

/*
 * Returns emojis of the guild
 * @param {Guild} guild
 * @param {Object} options
 * @returns {Promise<Object[]>}
 */
async function getEmojis(guild, options) {
  const emojis = [];

  for (const emoji of guild.emojis.cache.values()) {
    const emojiData = { name: emoji.name };

    if (options.saveImages === 'base64') {
      emojiData.base64 = (await fetchBuffer(emoji.url)).toString('base64');
    } else {
      emojiData.url = emoji.url;
    }

    emojis.push(emojiData);
  }

  return emojis;
}

/*
 * Fetch channel data based on type
 * @param {GuildChannel} channel
 * @param {Object} options
 * @returns {Promise<Object>}
 */
async function fetchAnyChannelData(channel, options) {
  if (['GUILD_TEXT', 'GUILD_NEWS'].includes(channel.type)) {
    return fetchTextChannelData(channel, options);
  }

  return fetchVoiceChannelData(channel);
}

/*
 * Returns channels of the guild
 * @param {Guild} guild
 * @param {Object} options
 * @returns {Promise<Object>}
 */
async function getChannels(guild, options) {
  const allChannels = guild.channels.cache;

  const categories = allChannels.filter(ch => ch.type === 'GUILD_CATEGORY').sort((a, b) => a.position - b.position);

  const categoryDataPromises = categories.map(async category => {
    const children = allChannels.filter(c => c.parentId === category.id).sort((a, b) => a.position - b.position);

    const childrenData = await Promise.all(children.map(child => fetchAnyChannelData(child, options)));

    return {
      name: category.name,
      permissions: fetchChannelPermissions(category),
      children: childrenData,
    };
  });

  const others = allChannels
    .filter(ch => !ch.parent && ch.type !== 'GUILD_CATEGORY' && !ch.isThread?.() && ch.type !== 'GUILD_STORE')
    .sort((a, b) => a.position - b.position);

  const [categoriesResult, othersResult] = await Promise.all([
    Promise.all(categoryDataPromises),
    Promise.all(others.map(ch => fetchAnyChannelData(ch, options))),
  ]);

  return {
    categories: categoriesResult,
    others: othersResult,
  };
}

module.exports = {
  getBans,
  getMembers,
  getRoles,
  getEmojis,
  getChannels,
};
