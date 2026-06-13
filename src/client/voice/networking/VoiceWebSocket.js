'use strict';

const EventEmitter = require('events');
const { Buffer } = require('node:buffer');
const { setTimeout, setInterval, clearInterval } = require('node:timers');
const WebSocket = require('../../../WebSocket');
const { Error } = require('../../../errors');
const { VoiceOpcodes } = require('../../../util/Constants');
const DAVESession = require('../util/DAVESession');

const MAX_SEQUENCE = 2 ** 16 - 1;

class VoiceWebSocket extends EventEmitter {
  constructor(connection) {
    super();
    this.connection = connection;
    this.attempts = 0;
    this._sequenceNumber = -1;
    this.dead = false;
    this.heartbeatInterval = null;
    this.lastHeartbeatAck = 0;
    this.lastHeartbeatSend = 0;
    this.missedHeartbeats = 0;
    this.ping = undefined;
    this.daveSession = null;
    this.connectedClients = new Set();
    this.connection.on('closing', this.shutdown.bind(this));
  }

  get client() {
    return this.connection.client;
  }

  shutdown() {
    this.emit('debug', `[WS] shutdown requested`);
    this.dead = true;
    this.destroySession();
    this.reset();
  }

  destroySession() {
    if (this.daveSession) {
      this.daveSession.destroy();
      this.daveSession = null;
    }
  }

  reset() {
    this.emit('debug', `[WS] reset requested`);
    if (this.ws) {
      if (this.ws.readyState !== WebSocket.CLOSED) this.ws.close();
      this.ws = null;
    }
    this.clearHeartbeat();
  }

  connect() {
    this.emit('debug', `[WS] connect requested`);
    if (this.dead) return;
    if (this.ws) this.reset();
    if (this.attempts >= 5) {
      this.emit('debug', new Error('VOICE_CONNECTION_ATTEMPTS_EXCEEDED', this.attempts));
      return;
    }

    this.attempts++;

    this.ws = WebSocket.create(`wss://${this.connection.authentication.endpoint}/`, { v: 8 });
    this.emit('debug', `[WS] connecting, ${this.attempts} attempts, ${this.ws.url}`);
    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onclose = this.onClose.bind(this);
    this.ws.onerror = this.onError.bind(this);
  }

  send(data) {
    this.emit('debug', `[WS] >> ${data}`);
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) throw new Error('WS_NOT_OPEN', data);
      this.ws.send(data, null, error => {
        if (error) reject(error);
        else resolve(data);
      });
    });
  }

  async sendPacket(packet) {
    packet = JSON.stringify(packet);
    return this.send(packet);
  }

  sendBinaryMessage(opcode, payload) {
    try {
      const message = Buffer.concat([Buffer.from([opcode]), payload]);
      this.emit('debug', `[WS] >> [bin] opcode ${opcode}, ${payload.byteLength} bytes`);
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) throw new Error('WS_NOT_OPEN');
      this.ws.send(message);
    } catch (error) {
      this.emit('error', error);
    }
  }

  onOpen() {
    this.emit('debug', `[WS] opened at gateway ${this.connection.authentication.endpoint}`);
    const identifyPayload = {
      op: VoiceOpcodes.IDENTIFY,
      d: {
        server_id: this.connection.serverId || this.connection.channel.guild?.id || this.connection.channel.id,
        user_id: this.client.user.id,
        session_id: this.connection.authentication.sessionId,
        token: this.connection.authentication.token,
        max_dave_protocol_version: DAVESession.getMaxProtocolVersion(),
      },
    };
    this.sendPacket(identifyPayload).catch(() => {
      this.emit('error', new Error('VOICE_JOIN_SOCKET_CLOSED'));
    });
  }

  onMessage(event) {
    if (event.data instanceof ArrayBuffer || event.data instanceof Buffer) {
      const buffer = Buffer.isBuffer(event.data) ? event.data : Buffer.from(event.data);
      return this.onBinaryMessage(buffer);
    }
    if (typeof event.data !== 'string') return;
    try {
      return this.onPacket(WebSocket.unpack(event.data, 'json'));
    } catch (error) {
      return this.onError(error);
    }
  }

  onBinaryMessage(buffer) {
    if (buffer.length < 3) return;
    const seq = buffer.readUInt16BE(0);
    const op = buffer.readUInt8(2);
    const payload = buffer.subarray(3);

    this._sequenceNumber = seq;
    this.emit('debug', `[WS] << [bin] opcode ${op}, seq ${seq}, ${payload.byteLength} bytes`);

    try {
      if (this.daveSession && op === VoiceOpcodes.DAVE_MLS_EXTERNAL_SENDER) {
        this.daveSession.setExternalSender(payload);
      } else if (this.daveSession && op === VoiceOpcodes.DAVE_MLS_PROPOSALS) {
        const result = this.daveSession.processProposals(payload, this.connectedClients);
        if (result) this.sendBinaryMessage(VoiceOpcodes.DAVE_MLS_COMMIT_WELCOME, result);
      } else if (this.daveSession && op === VoiceOpcodes.DAVE_MLS_ANNOUNCE_COMMIT_TRANSITION) {
        const { transitionId, success } = this.daveSession.processCommit(payload);
        if (success) {
          if (transitionId === 0) this.emit('daveTransitioned', transitionId);
          else
            this.sendPacket({
              op: VoiceOpcodes.DAVE_TRANSITION_READY,
              d: { transition_id: transitionId },
            });
        }
      } else if (this.daveSession && op === VoiceOpcodes.DAVE_MLS_WELCOME) {
        const { transitionId, success } = this.daveSession.processWelcome(payload);
        if (success) {
          if (transitionId === 0) this.emit('daveTransitioned', transitionId);
          else
            this.sendPacket({
              op: VoiceOpcodes.DAVE_TRANSITION_READY,
              d: { transition_id: transitionId },
            });
        }
      } else if (this.daveSession && op === VoiceOpcodes.DAVE_MLS_KEY_PACKAGE) {
        this.emit('debug', `[WS] Unexpected DAVE MLS key package from server`);
      } else {
        this.emit('unknownPacket', { op, binary: true });
      }
    } catch (err) {
      this.emit('debug', `[WS] Binary message error (op ${op}): ${err}`);
    }
  }

  onClose(event) {
    this.emit('debug', `[WS] closed with code ${event.code} and reason: ${event.reason}`);
    this.destroySession();
    if (!this.dead) setTimeout(this.connect.bind(this), this.attempts * 1000).unref();
  }

  onError(error) {
    this.emit('debug', `[WS] Error: ${error}`);
    this.emit('error', error);
  }

  onPacket(packet) {
    this.emit('debug', `[WS] << ${JSON.stringify(packet)}`);
    if (packet.seq) this._sequenceNumber = packet.seq;
    switch (packet.op) {
      case VoiceOpcodes.HELLO:
        this.setHeartbeat(packet.d.heartbeat_interval);
        break;
      case VoiceOpcodes.READY:
        this.emit('ready', packet.d);
        this.connection.setVideoStatus(false);
        break;
      case VoiceOpcodes.SESSION_DESCRIPTION:
        packet.d.secret_key = new Uint8Array(packet.d.secret_key);
        if (packet.d.dave_protocol_version !== undefined) {
          try {
            this.createDaveSession(packet.d.dave_protocol_version);
          } catch (err) {
            this.emit('debug', `[WS] Failed to create DAVE session: ${err}`);
          }
        }
        this.emit('sessionDescription', packet.d);
        break;
      case VoiceOpcodes.HEARTBEAT_ACK:
        this.lastHeartbeatAck = Date.now();
        this.missedHeartbeats = 0;
        this.ping = this.lastHeartbeatAck - this.lastHeartbeatSend;
        break;
      case VoiceOpcodes.CLIENTS_CONNECT:
        if (packet.d.user_ids) {
          for (const id of packet.d.user_ids) this.connectedClients.add(id);
        }
        break;
      case VoiceOpcodes.CLIENT_DISCONNECT:
        this.connectedClients.delete(packet.d.user_id);
        const streamInfo = this.connection.receiver && this.connection.receiver.packets.streams.get(packet.d.user_id);
        if (streamInfo) {
          this.connection.receiver.packets.streams.delete(packet.d.user_id);
          streamInfo.stream.push(null);
        }
        break;
      case VoiceOpcodes.SPEAKING:
        this.emit('startSpeaking', packet.d);
        break;
      case VoiceOpcodes.SOURCES:
        this.emit('startStreaming', packet.d);
        break;
      case VoiceOpcodes.DAVE_PREPARE_TRANSITION:
        if (this.daveSession) {
          const sendReady = this.daveSession.prepareTransition(packet.d);
          if (sendReady)
            this.sendPacket({
              op: VoiceOpcodes.DAVE_TRANSITION_READY,
              d: { transition_id: packet.d.transition_id },
            });
          if (packet.d.transition_id === 0) {
            this.emit('daveTransitioned', 0);
          }
        }
        break;
      case VoiceOpcodes.DAVE_EXECUTE_TRANSITION:
        if (this.daveSession) {
          const transitioned = this.daveSession.executeTransition(packet.d.transition_id);
          if (transitioned) this.emit('daveTransitioned', packet.d.transition_id);
        }
        break;
      case VoiceOpcodes.DAVE_PREPARE_EPOCH:
        if (this.daveSession) this.daveSession.prepareEpoch(packet.d);
        break;
      default:
        this.emit('unknownPacket', packet);
        break;
    }
  }

  createDaveSession(protocolVersion) {
    if (protocolVersion === 0) return;
    this.destroySession();
    const session = new DAVESession(
      protocolVersion,
      this.client.user.id,
      this.connection.channel.id,
    );
    session.on('debug', msg => this.emit('debug', `[DAVE] ${msg}`));
    session.on('keyPackage', keyPackage => {
      this.sendBinaryMessage(VoiceOpcodes.DAVE_MLS_KEY_PACKAGE, keyPackage);
    });
    session.on('invalidateTransition', transitionId => {
      this.sendPacket({
        op: VoiceOpcodes.DAVE_MLS_INVALID_COMMIT_WELCOME,
        d: { transition_id: transitionId },
      });
    });
    session.reinit();
    this.daveSession = session;
    this.emit('debug', `[DAVE] Created DAVE session for protocol version ${protocolVersion}`);
  }

  setHeartbeat(interval) {
    if (!interval || isNaN(interval)) {
      this.onError(new Error('VOICE_INVALID_HEARTBEAT'));
      return;
    }
    if (this.heartbeatInterval) {
      this.emit('warn', 'A voice heartbeat interval is being overwritten');
      clearInterval(this.heartbeatInterval);
    }
    this.lastHeartbeatAck = Date.now();
    this.lastHeartbeatSend = 0;
    this.heartbeatInterval = setInterval(this.sendHeartbeat.bind(this), interval).unref();
  }

  clearHeartbeat() {
    if (!this.heartbeatInterval) {
      this.emit('warn', 'Tried to clear a heartbeat interval that does not exist');
      return;
    }
    clearInterval(this.heartbeatInterval);
    this.heartbeatInterval = null;
  }

  sendHeartbeat() {
    if (this.lastHeartbeatSend !== 0 && this.missedHeartbeats >= 3) {
      this.ws.close();
      this.clearHeartbeat();
      return;
    }
    this.lastHeartbeatSend = Date.now();
    this.missedHeartbeats++;
    this.sendPacket({
      op: VoiceOpcodes.HEARTBEAT,
      d: {
        t: this.lastHeartbeatSend,
        seq_ack: this._sequenceNumber,
      },
    }).catch(() => {
      this.emit('warn', 'Tried to send heartbeat, but connection is not open');
      this.clearHeartbeat();
    });
  }

  encryptAudioPacket(packet) {
    if (this.daveSession) return this.daveSession.encrypt(packet);
    return packet;
  }

  decryptAudioPacket(packet, userId) {
    if (this.daveSession) return this.daveSession.decrypt(packet, userId);
    return packet;
  }
}

module.exports = VoiceWebSocket;
