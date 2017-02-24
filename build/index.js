'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hasWorker = require('./lib/has-worker');

var _bufferUtils = require('./lib/buffer-utils');

var bufferUtils = _interopRequireWildcard(_bufferUtils);

var _exif = require('./lib/exif');

var _exif2 = _interopRequireDefault(_exif);

var _decode = require('./lib/decode');

var _decode2 = _interopRequireDefault(_decode);

var _encode = require('./lib/encode');

var _encode2 = _interopRequireDefault(_encode);

var _magic = require('./lib/magic');

var _magic2 = _interopRequireDefault(_magic);

var _info = require('./lib/info');

var _info2 = _interopRequireDefault(_info);

var _exifWorker = require('./lib/exif-worker');

var _exifWorker2 = _interopRequireDefault(_exifWorker);

var _decodeWorker = require('./lib/decode-worker');

var _decodeWorker2 = _interopRequireDefault(_decodeWorker);

var _encodeWorker = require('./lib/encode-worker');

var _encodeWorker2 = _interopRequireDefault(_encodeWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Decode
 *
 * @param {Buffer|ArrayBuffer|Uint8Array} buf
 * @param {object} options Params: { width: number, height: number }
 * @param {function} cb Callback to invoke on completion
 *
 * @callback { width: number, height: number, data: Uint8Array }
 */
function decodeBuffer(buf, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  try {
    buf = bufferUtils.toUint8Array(buf);

    if (_hasWorker.hasWorker) {
      const wr = require('webworkify')(_decodeWorker2.default);

      wr.onmessage = ({ data: msg }) => {
        const err = msg.err ? new Error(msg.err) : undefined;
        cb(err, msg.result);
      };

      const msg = {
        buf: buf,
        options: options
      };

      if (options.transferable) {
        wr.postMessage(msg, [buf]);
      } else {
        wr.postMessage(msg);
      }
    } else {
      (0, _decode2.default)(buf, options, cb);
    }
  } catch (err) {
    cb(err);
  }
}

/**
 * Encode
 *
 * @param {Buffer|ArrayBuffer|Uint8Array} buf
 * @param {object} options Params { width: number, height: number, quality: number }
 * @param {function} cb Callback to invoke on completion
 *
 * @callback { width: number, height: number, data: Uint8Array }
 */
function encodeBuffer(buf, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  try {
    buf = bufferUtils.toArrayLike(buf);

    if (!options.hasOwnProperty('width') || !options.hasOwnProperty('height')) {
      return cb(new Error('Provide width & height of the buffer'));
    }

    if (_hasWorker.hasWorker) {
      const wr = require('webworkify')(_encodeWorker2.default);

      wr.onmessage = ({ data: msg }) => {
        const err = msg.err ? new Error(msg.err) : undefined;
        cb(err, msg.result);
      };

      const msg = {
        buf: buf,
        options: options
      };

      if (options.transferable) {
        wr.postMessage(msg, [buf]);
      } else {
        wr.postMessage(msg);
      }
    } else {
      (0, _encode2.default)(buf, options, cb);
    }
  } catch (err) {
    cb(err);
  }
}

/**
 * Get EXIF
 *
 * @param {Buffer|ArrayBuffer|Uint8Array} buf
 * @param {object} options Params { hasMakerNote: true|false }
 * @param {function} cb Callback to invoke on completion
 *
 * @callback Object { name: value, ... }
 */
function exifBuffer(buf, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  try {
    buf = bufferUtils.toArrayBuffer(buf);

    if (_hasWorker.hasWorker) {
      const wr = require('webworkify')(_exifWorker2.default);

      wr.onmessage = ({ data: msg }) => {
        const err = msg.err ? new Error(msg.err) : undefined;
        cb(err, msg.result);
      };

      const msg = {
        buf: buf
      };

      if (options.transferable) {
        wr.postMessage(msg, [buf]);
      } else {
        wr.postMessage(msg);
      }
    } else {
      (0, _exif2.default)(buf, options, cb);
    }
  } catch (err) {
    cb(err);
  }
}

/**
 * Detect mime-type for the Buffer
 * @param {Buffer|ArrayBuffer|Uint8Array} buf Data buffer
 * @param {function} cb Callback to invoke on completion
 */
function magicBuffer(buf, cb) {
  try {
    buf = bufferUtils.toBuffer(buf);
    (0, _magic2.default)(buf, cb);
  } catch (err) {
    cb(err);
  }
}

/**
 * Get image information without reading and decoding a file
 * @param {Buffer|ArrayBuffer|Uint8Array} buf Data buffer
 * @param {function} cb Callback to invoke on completion
 */
function infoBuffer(buf, cb) {
  try {
    buf = bufferUtils.toBuffer(buf);
    (0, _info2.default)(buf, cb);
  } catch (err) {
    cb(err);
  }
}

exports.default = {
  decode: decodeBuffer,
  encode: encodeBuffer,
  exif: exifBuffer,
  magic: magicBuffer,
  info: infoBuffer
};
module.exports = exports['default'];