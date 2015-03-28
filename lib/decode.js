'use strict';

var JpegImage = require('./backend/jpg').JpegImage;

module.exports = decode;


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
    var dest = {
      width: width,
      height: height,
      data: new Uint8Array(width * height * 4)
    };
    j.copyToImageData(dest);
    return dest.data;
  }

  try {
    var j = new JpegImage();
    j.parse(buf);

    var width = options.width || j.width;
    var height = options.height || j.height;
    var data = getData(j, width, height);

    var result = {
      width: width,
      height: height,
      data: data
    };

    cb(null, result);
  } catch(err) {
    if(typeof err === 'string') {
      // jpg.js throws 'string' values, convert to an Error
      err = new Error(err);
    }
    cb(err);
  }
}
