'use strict';

var hasWorker = require('./lib/has-worker').HAS_WORKER;

var bufferUtils = require('./lib/buffer-utils');

var exif = require('./lib/exif');
var decode = require('./lib/decode');
var encode = require('./lib/encode');
var magic = require('./lib/magic');
var info = require('./lib/info');

var exifWorker = require('./lib/exif-worker');
var decodeWorker = require('./lib/decode-worker');
var encodeWorker = require('./lib/encode-worker');


module.exports.decode = decodeBuffer;
module.exports.encode = encodeBuffer;
module.exports.exif = exifBuffer;
module.exports.magic = magicBuffer;
module.exports.info = infoBuffer;


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
  if(typeof options === 'function') {
    cb = options;
    options = {};
  }

  try {
    buf = bufferUtils.toUint8Array(buf);

    if(hasWorker) {
      var wr = require('webworkify')(decodeWorker);

      wr.onmessage = function(ev) {
        var msg = ev.data;
        var err = msg.err ? new Error(msg.err) : undefined;
        cb(err, msg.result);
      };

      var msg = {
        buf: buf,
        options: options
      };

      if (options.transferable) {
        wr.postMessage(msg, [ buf ]);
      } else {
        wr.postMessage(msg);
      }
    } else {
      decode(buf, options, cb);
    }
  } catch(err) {
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
  if(typeof options === 'function') {
    cb = options;
    options = {};
  }

  try {
    buf = bufferUtils.toArrayLike(buf);

    if(!options.hasOwnProperty('width') || !options.hasOwnProperty('height')) {
      return cb(new Error('Provide width & height of the buffer'));
    }

    if(hasWorker) {
      var wr = require('webworkify')(encodeWorker);

      wr.onmessage = function(ev) {
        var msg = ev.data;
        var err = msg.err ? new Error(msg.err) : undefined;
        cb(err, msg.result);
      };

      var msg = {
        buf: buf,
        options: options
      };

      if (options.transferable) {
        wr.postMessage(msg, [ buf ]);
      } else {
        wr.postMessage(msg);
      }
    } else {
      encode(buf, options, cb);
    }
  } catch(err) {
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
  if(typeof options === 'function') {
    cb = options;
    options = {};
  }

  try {
    buf = bufferUtils.toArrayBuffer(buf);

    if(hasWorker) {
      var wr = require('webworkify')(exifWorker);

      wr.onmessage = function(ev) {
        var msg = ev.data;
        var err = msg.err ? new Error(msg.err) : undefined;
        cb(err, msg.result);
      };

      var msg = {
        buf: buf
      };

      if (options.transferable) {
        wr.postMessage(msg, [ buf ]);
      } else {
        wr.postMessage(msg);
      }
    } else {
      exif(buf, options, cb);
    }
  } catch(err) {
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
    magic.lookup(buf, cb);
  } catch(err) {
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
    info.collect(buf, cb);
  } catch(err) {
    cb(err);
  }
}
