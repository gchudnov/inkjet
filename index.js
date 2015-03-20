'use strict';

var ExifReader = require('./lib/ExifReader').ExifReader;
var JpegImage = require('./lib/jpg').JpegImage;
var encoder = require('./lib/encoder');

module.exports.decode = decode;
module.exports.encode = encode;
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

    var parser = j._parser;
    var obj = {
      get width() {
        return parser.width;
      },
      get height() {
        return parser.height;
      },
      get data() {
        return parser.getData(parser.width, parser.height, false);
      },
      getData: function (width, height) {
        return parser.getData(width, height, false);
      }
    };

    cb(null, obj);
  } catch(err) {
    cb(err);
  }
}

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
