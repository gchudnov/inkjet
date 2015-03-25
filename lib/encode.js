'use strict';

var encoder = require('./3rd-party/encoder');

module.exports = encode;

/**
 * Encode the data to JPEG format
 *
 * @param buf buffer to encode
 * @param options encoding params { width, height, quality }
 * @param cb callback to invoke on completion
 *
 * Return value:
 * { width, height, data }
 *
 */
function encode(buf, options, cb) {
  try {
    var imageData = {
      data: buf,
      width: options.width,
      height: options.height
    };
    var data = encoder(imageData, options.quality);
    cb(null, data);
  } catch(err) {
    cb(err);
  }
}
