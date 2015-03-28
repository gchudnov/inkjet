'use strict';

var encoder = require('./backend/encoder');

module.exports = encode;

/**
 * Encode the data to JPEG format
 *
 * @param buf Buffer|Uint8Array
 * @param options Object { width: number, height: number, quality: number }
 * @param cb Callback to invoke on completion
 *
 * @callback { width: number, height: number, data: Uint8Array }
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
