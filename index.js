'use strict';

var hasWorker = require('./lib/has-worker').HAS_WORKER;

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
 * @param buf
 * @param options
 * @param cb
 */
function decodeBuffer(buf, options, cb) {
  if(typeof options === 'function') {
    cb = options;
    options = {};
  }

  if(buf instanceof ArrayBuffer) {
    buf = new Uint8Array(buf, 0);
  }

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
}

/**
 * Encode
 *
 * @param buf
 * @param options
 * @param cb
 */
function encodeBuffer(buf, options, cb) {
  if(typeof options === 'function') {
    cb = options;
    options = {};
  }

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
}

/**
 * Get EXIF
 *
 * @param buf
 * @param options
 * @param cb
 */
function exifBuffer(buf, options, cb) {
  if(typeof options === 'function') {
    cb = options;
    options = {};
  }

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
}
