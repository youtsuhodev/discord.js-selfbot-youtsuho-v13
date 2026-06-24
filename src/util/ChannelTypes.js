'use strict';

function createEnum(keys) {
  const obj = {};
  for (const [index, key] of keys.entries()) {
    if (key !== null && key !== undefined) {
      obj[key] = index;
      obj[index] = key;
    }
  }
  return obj;
}

exports.ChannelTypes = createEnum([
  'GUILD_TEXT',
  'DM',
  'GUILD_VOICE',
  'GROUP_DM',
  'GUILD_CATEGORY',
  'GUILD_NEWS',
  'GUILD_STORE',
  ...Array(3).fill(null),
  'GUILD_NEWS_THREAD',
  'GUILD_PUBLIC_THREAD',
  'GUILD_PRIVATE_THREAD',
  'GUILD_STAGE_VOICE',
  'GUILD_DIRECTORY',
  'GUILD_FORUM',
  'GUILD_MEDIA',
]);

exports.ThreadChannelTypes = ['GUILD_NEWS_THREAD', 'GUILD_PUBLIC_THREAD', 'GUILD_PRIVATE_THREAD'];

exports.VoiceBasedChannelTypes = ['GUILD_VOICE', 'GUILD_STAGE_VOICE'];

exports.TextBasedChannelTypes = [
  'DM',
  'GUILD_TEXT',
  'GUILD_NEWS',
  'GUILD_NEWS_THREAD',
  'GUILD_PUBLIC_THREAD',
  'GUILD_PRIVATE_THREAD',
  'GUILD_VOICE',
];

exports.ChannelTypesForVideo = ['GUILD_VOICE', 'GUILD_STAGE_VOICE'];
