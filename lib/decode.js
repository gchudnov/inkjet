'use strict';

var JpegImage = require('./3rd-party/jpg').JpegImage;

module.exports = decode;


/**
 * Decode the JPEG data
 *
 * @param buf Uint8Array
 * @param options A set of decode params
 * @param cb Callback to invoke on completion
 *
 * Return Value:
 * { width, height, data }
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
