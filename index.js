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
 * Decode the provided buffer
 */
function decodeBuffer(buf, options, cb) {
  if(hasWorker) {
    // TODO: implement this
  } else {
    decode(buf, options, cb);
  }
}

/**
 * Encode the provided buffer
 */
function encodeBuffer(buf, options, cb) {
  if(hasWorker) {
    // TODO: implement this
  } else {
    encode(buf, options, cb);
  }
}

/**
 * Get EXIF data for the provided buffer
 */
function exifBuffer(buf, options, cb) {
  if(hasWorker) {
    var wr = require('webworkify')(exifWorker);
    wr.onmessage = function(ev) {
      var msg = ev.data;

      cb(msg.err, msg.result);
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
