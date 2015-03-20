'use strict';

var ExifReader = require('./lib/ExifReader').ExifReader;
var JpegImage = require('./lib/jpg').JpegImage;

module.exports.decode = decode;
module.exports.readExif = readExif;

// TODO: convert to respective format: Buffer, ArrayBuffer, Uint8Array automatically

/**
 * Read EXIF data
 * @param buf ArrayBuffer
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
 * Decode the JPEG data
 * @param buf Uint8Array
 * @param cb Callback to invoke on completion
 */
function decode(buf, cb) {
  try {
    var j = new JpegImage();
    j.parse(buf);
    cb(null, j);
  } catch(err) {
    cb(err);
  }
}
