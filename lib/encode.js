'use strict';

var encoder = require('./3rd-party/encoder');

module.exports = encode;

/**
 * encode the data to JPEG format
 *
 * data: { width, height, data }
 *
 * @param buf Buffer to encode
 * @param options Encoding params
 * @param cb Callback to invoke on completion
 */
function encode(buf, options, cb) {
  var quality;
  if(typeof options === 'number') {
    quality = options;
  } else {
    quality = options.quality;
  }

  try {
    var data = encoder(buf, quality);
    cb(null, data);
  } catch(err) {
    cb(err);
  }
}
