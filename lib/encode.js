'use strict';

var hasWorker = require('./has-worker').HAS_WORKER;
var encoder = require('./3rd-party/encoder');


module.exports.encode = encode;


/**
 * encode the data to JPEG format
 *
 * data: { width, height, data }
 *
 * @param buf Buffer to encode
 * @param quality Image quality
 * @param cb Callback to invoke on completion
 */
function encode(buf, quality, cb) {
  try {
    var data = encoder(buf, quality);
    cb(null, data);
  } catch(err) {
    cb(err);
  }
}
