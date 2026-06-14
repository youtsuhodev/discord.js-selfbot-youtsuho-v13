'use strict';

module.exports = (client, packet) => {
  client.emit(
    'debug',
    `[WS] VOICE_STATE_UPDATE handler called: user_id=${packet.d?.user_id} session_id=${packet.d?.session_id} channel_id=${packet.d?.channel_id}`,
  );
  client.actions.VoiceStateUpdate.handle(packet.d);
};
