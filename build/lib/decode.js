'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = decode;

var _jpg = require('./backend/jpg');

/**
 * Decode the JPEG data
 *
 * @param buf Uint8Array
 * @param options Object { width: number, height: number }
 * @param cb Callback to invoke on completion
 *
 * @callback { width: number, height: number, data: Uint8Array }
 */
function decode(buf, options, cb) {
  function getData(j, width, height) {
    const dest = {
      width: width,
      height: height,
      data: new Uint8Array(width * height * 4)
    };
    j.copyToImageData(dest);
    return dest.data;
  }

  try {
    const j = new _jpg.JpegImage();
    j.parse(buf);

    const width = options.width || j.width;
    const height = options.height || j.height;
    const data = getData(j, width, height);

    const result = {
      width: width,
      height: height,
      data: data
    };

    cb(null, result);
  } catch (err) {
    if (typeof err === 'string') {
      // jpg.js throws 'string' values, convert to an Error
      err = new Error(err);
    }
    cb(err);
  }
}
module.exports = exports['default'];