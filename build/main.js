"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hasWorker = require("./lib/has-worker");

var bufferUtils = _interopRequireWildcard(require("./lib/util/buffer"));

var _exif = _interopRequireDefault(require("./lib/exif"));

var _decode = _interopRequireDefault(require("./lib/decode"));

var _encode = _interopRequireDefault(require("./lib/encode"));

var _magic = _interopRequireDefault(require("./lib/magic"));

var _info = _interopRequireDefault(require("./lib/info"));

var _exifWorker = _interopRequireDefault(require("./lib/exif-worker"));

var _decodeWorker = _interopRequireDefault(require("./lib/decode-worker"));

var _encodeWorker = _interopRequireDefault(require("./lib/encode-worker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    buf = bufferUtils.toArrayLike(buf);

    if (_hasWorker.hasWorker) {
      var wr = require('webworkify')(_decodeWorker["default"]);

      wr.onmessage = function (_ref) {
        var msg = _ref.data;
        var err = msg.err ? new Error(msg.err) : undefined;
        cb(err, msg.result);
      };

      var msg = {
        buf: buf,
        options: options
      };

      if (options.transferable) {
        wr.postMessage(msg, [buf]);
      } else {
        wr.postMessage(msg);
      }
    } else {
      (0, _decode["default"])(buf, options, cb);
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
      return cb(new Error('Width & height of the buffer is not provided.'));
    }

    if (_hasWorker.hasWorker) {
      var wr = require('webworkify')(_encodeWorker["default"]);

      wr.onmessage = function (_ref2) {
        var msg = _ref2.data;
        var err = msg.err ? new Error(msg.err) : undefined;
        cb(err, msg.result);
      };

      var msg = {
        buf: buf,
        options: options
      };

      if (options.transferable) {
        wr.postMessage(msg, [buf]);
      } else {
        wr.postMessage(msg);
      }
    } else {
      (0, _encode["default"])(buf, options, cb);
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
      var wr = require('webworkify')(_exifWorker["default"]);

      wr.onmessage = function (_ref3) {
        var msg = _ref3.data;
        var err = msg.err ? new Error(msg.err) : undefined;
        cb(err, msg.result);
      };

      var msg = {
        buf: buf
      };

      if (options.transferable) {
        wr.postMessage(msg, [buf]);
      } else {
        wr.postMessage(msg);
      }
    } else {
      (0, _exif["default"])(buf, options, cb);
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
    (0, _magic["default"])(buf, cb);
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
    (0, _info["default"])(buf, cb);
  } catch (err) {
    cb(err);
  }
}

var _default = {
  decode: decodeBuffer,
  encode: encodeBuffer,
  exif: exifBuffer,
  magic: magicBuffer,
  info: infoBuffer
};
exports["default"] = _default;