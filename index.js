'use strict';

var hasWorker = require('./lib/has-worker').HAS_WORKER;

var bufferUtils = require('./lib/buffer-utils');

var exif = require('./lib/exif');
var decode = require('./lib/decode');
var encode = require('./lib/encode');

var exifWorker = require('./lib/exif-worker');
var decodeWorker = require('./lib/decode-worker');
var encodeWorker = require('./lib/encode-worker');


module.exports.decode = decodeBuffer;
module.exports.encode = encodeBuffer;
module.exports.exif = exifBuffer;


/**
 * Decode
 *
 * @param buf Uint8Array|ArrayBuffer|Buffer
 * @param options Object { width: number, height: number }
 * @param cb Callback to invoke on completion
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
 * @param buf Buffer
 * @param options Object { width: number, height: number, quality: number }
 * @param cb Callback to invoke on completion
 *
 * @callback { width: number, height: number, data: Uint8Array }
 */
function encodeBuffer(buf, options, cb) {
  if(typeof options === 'function') {
    cb = options;
    options = {};
  }

  try {
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
 * @param buf Buffer|ArrayBuffer
 * @param options Object { hasMakerNote: true|false }
 * @param cb Callback to invoke on completion
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
