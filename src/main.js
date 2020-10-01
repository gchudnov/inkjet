import { hasWorker } from './lib/has-worker';

import * as bufferUtils from './lib/util/buffer';

import exif from './lib/exif';
import decode from './lib/decode';
import encode from './lib/encode';
import magic from './lib/magic';
import info from './lib/info';

import exifWorker from './lib/exif-worker';
import decodeWorker from './lib/decode-worker';
import encodeWorker from './lib/encode-worker';

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
    buf = bufferUtils.toArrayLike(buf);

    if(hasWorker) {
      const wr = require('webworkify')(decodeWorker);

      wr.onmessage = ({ data: msg }) => {
        const err = msg.err ? new Error(msg.err) : undefined;
        cb(err, msg.result);
      };

      const msg = {
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
      return cb(new Error('Width & height of the buffer is not provided.'));
    }

    if(hasWorker) {
      const wr = require('webworkify')(encodeWorker);

      wr.onmessage = ({ data: msg }) => {
        const err = msg.err ? new Error(msg.err) : undefined;
        cb(err, msg.result);
      };

      const msg = {
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
      const wr = require('webworkify')(exifWorker);

      wr.onmessage = ({ data: msg }) => {
        const err = msg.err ? new Error(msg.err) : undefined;
        cb(err, msg.result);
      };

      const msg = {
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
    magic(buf, cb);
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
    info(buf, cb);
  } catch(err) {
    cb(err);
  }
}


export default {
  decode: decodeBuffer,
  encode: encodeBuffer,
  exif: exifBuffer,
  magic: magicBuffer,
  info: infoBuffer,
}
