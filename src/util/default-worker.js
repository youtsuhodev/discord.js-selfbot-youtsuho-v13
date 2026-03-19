'use strict';

const { Buffer } = require('node:buffer');
const crypto = require('node:crypto');
const { parentPort } = require('node:worker_threads');
const zlib = require('node:zlib');
const { OperationTypes } = require('./WorkerManager');

/**
 * Worker par défaut pour les opérations CPU-intensives
 * Reçoit des tâches du thread principal et les exécute
 */

// Importer les modules nécessaires

// Gestionnaire des messages du thread principal
parentPort.on('message', async task => {
  try {
    const result = await executeTask(task);
    parentPort.postMessage({
      id: task.id,
      success: true,
      data: result,
    });
  } catch (error) {
    parentPort.postMessage({
      id: task.id,
      success: false,
      error: error.message,
    });
  }
});

/**
 * Exécute une tâche spécifique
 * @param {Object} task Tâche à exécuter
 * @returns {*} Résultat de la tâche
 */
async function executeTask(task) {
  const { type, data, options } = task;

  switch (type) {
    case OperationTypes.IMAGE_PROCESSING:
      return processImageData(data, options);

    case OperationTypes.ENCRYPTION:
      return encryptData(data, options);

    case OperationTypes.DECRYPTION:
      return decryptData(data, options);

    case OperationTypes.DATA_COMPRESSION:
      return compressData(data, options);

    case OperationTypes.DATA_DECOMPRESSION:
      return decompressData(data, options);

    case OperationTypes.JSON_PARSE:
      return parseJSONSafely(data);

    case OperationTypes.JSON_STRINGIFY:
      return stringifyJSONSafely(data, options);

    case OperationTypes.VALIDATION:
      return validateData(data, options);

    case OperationTypes.CALCULATION:
      return performCalculation(data, options);

    default:
      throw new Error(`Type de tâche non supporté: ${type}`);
  }
}

/**
 * Traitement d'image basique
 * @param {Buffer} imageBuffer Buffer de l'image
 * @param {Object} options Options de traitement
 * @returns {Object} Métadonnées de l'image
 */
function processImageData(imageBuffer, options = {}) {
  // Traitement basique - dans une vraie implémentation, utiliser sharp ou jimp
  return {
    size: imageBuffer.length,
    format: options?.format || 'unknown',
    processed: true,
    timestamp: Date.now(),
  };
}

/**
 * Chiffrement de données
 * @param {string|Buffer} data Données à chiffrer
 * @param {Object} options Options de chiffrement
 * @returns {Object} Données chiffrées
 */
function encryptData(data, options = {}) {
  const algorithm = options.algorithm || 'aes-256-gcm';
  const key = options.key || crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipher(algorithm, key);
  cipher.setAAD(Buffer.from('discord-worker', 'utf8'));

  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex'),
    algorithm,
  };
}

/**
 * Déchiffrement de données
 * @param {Object} encryptedData Données chiffrées
 * @param {Object} options Options de déchiffrement
 * @returns {string} Données déchiffrées
 */
function decryptData(encryptedData, options = {}) {
  const { encrypted, authTag, algorithm } = encryptedData;
  const key = options.key;

  if (!key) {
    throw new Error('Clé de déchiffrement requise');
  }

  const decipher = crypto.createDecipher(algorithm, key);
  decipher.setAAD(Buffer.from('discord-worker', 'utf8'));
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Compression de données
 * @param {string|Buffer} data Données à compresser
 * @param {Object} options Options de compression
 * @returns {Buffer} Données compressées
 */
function compressData(data, options = {}) {
  const algorithm = options.algorithm || 'gzip';
  const level = options.level || 9;

  return new Promise((resolve, reject) => {
    const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);

    if (algorithm === 'gzip') {
      zlib.gzip(buffer, { level }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    } else if (algorithm === 'deflate') {
      zlib.deflate(buffer, { level }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    } else if (algorithm === 'brotli') {
      zlib.brotliCompress(
        buffer,
        {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: level,
          },
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        },
      );
    } else {
      reject(new Error(`Algorithme de compression non supporté: ${algorithm}`));
    }
  });
}

/**
 * Décompression de données
 * @param {Buffer} compressedData Données compressées
 * @param {Object} options Options de décompression
 * @returns {Buffer} Données décompressées
 */
function decompressData(compressedData, options = {}) {
  const algorithm = options.algorithm || 'gzip';

  return new Promise((resolve, reject) => {
    if (algorithm === 'gzip') {
      zlib.gunzip(compressedData, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    } else if (algorithm === 'deflate') {
      zlib.inflate(compressedData, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    } else if (algorithm === 'brotli') {
      zlib.brotliDecompress(compressedData, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    } else {
      reject(new Error(`Algorithme de décompression non supporté: ${algorithm}`));
    }
  });
}

/**
 * Parsing JSON sécurisé
 * @param {string} jsonString JSON à parser
 * @returns {*} Données parsées
 */
function parseJSONSafely(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error(`JSON parsing failed: ${error.message}`);
  }
}

/**
 * Stringify JSON sécurisé
 * @param {*} data Données à stringifier
 * @param {Object} options Options
 * @returns {string} JSON string
 */
function stringifyJSONSafely(data, options = {}) {
  try {
    return JSON.stringify(data, null, options.indent || 0);
  } catch (error) {
    throw new Error(`JSON stringify failed: ${error.message}`);
  }
}

/**
 * Validation de données
 * @param {*} data Données à valider
 * @param {Object} options Options de validation
 * @returns {Object} Résultat de validation
 */
function validateData(data, options = {}) {
  const { schema, type } = options;
  const result = {
    valid: true,
    errors: [],
  };

  if (type) {
    switch (type) {
      case 'string':
        result.valid = typeof data === 'string';
        if (!result.valid) result.errors.push('Expected string');
        break;

      case 'number':
        result.valid = typeof data === 'number' && !isNaN(data);
        if (!result.valid) result.errors.push('Expected number');
        break;

      case 'array':
        result.valid = Array.isArray(data);
        if (!result.valid) result.errors.push('Expected array');
        break;

      case 'object':
        result.valid = typeof data === 'object' && data !== null && !Array.isArray(data);
        if (!result.valid) result.errors.push('Expected object');
        break;
    }
  }

  if (schema) {
    // Validation basique de schéma
    for (const [key, expectedType] of Object.entries(schema)) {
      if (!(key in data)) {
        result.valid = false;
        result.errors.push(`Missing required field: ${key}`);
      } else if (typeof data[key] !== expectedType) {
        result.valid = false;
        result.errors.push(`Field ${key} should be ${expectedType}, got ${typeof data[key]}`);
      }
    }
  }

  return result;
}

/**
 * Calculs mathématiques
 * @param {Object} data Données de calcul
 * @param {Object} options Options
 * @returns {*} Résultat du calcul
 */
function performCalculation(data) {
  const { operation, values } = data;

  switch (operation) {
    case 'sum':
      return values.reduce((a, b) => a + b, 0);

    case 'average':
      return values.reduce((a, b) => a + b, 0) / values.length;

    case 'min':
      return Math.min(...values);

    case 'max':
      return Math.max(...values);

    case 'factorial': {
      const factorial = n => (n <= 1 ? 1 : n * factorial(n - 1));
      return factorial(values[0]);
    }
    case 'fibonacci': {
      const fibonacci = n => (n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2));
      return fibonacci(values[0]);
    }

    default:
      throw new Error(`Opération non supportée: ${operation}`);
  }
}
