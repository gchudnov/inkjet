'use strict';

var ExifReader = require('./lib/ExifReader').ExifReader;


module.exports.decode = decode;
module.exports.readExif = readExif;


/**
 * Read EXIF data
 * @param buf Data buffer
 * @param cb Callback to invoke on completion
 */
function readExif(buf, cb) {
  try {
    var exif = new ExifReader();
    exif.load(buf);
    var metadata = exif.getAllTags();
    cb(null, metadata);
  } catch(err) {
    cb(err);
  }
}

/**
 * decode
 */
function decode() {
  console.log('decoded');
}
