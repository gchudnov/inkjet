'use strict';

var ExifReader = require('./3rd-party/ExifReader').ExifReader;

module.exports = exif;


/**
 * Read EXIF data from the provided buffer
 * @param buf
 * @param options
 * @param cb
 */
function exif(buf, options, cb) {
  if(typeof options === 'function') {
    cb = options;
    options = {};
  }

  try {
    var exif = new ExifReader();
    exif.load(buf);
    var metadata = exif.getAllTags();
    cb(null, metadata);
  } catch(err) {
    cb(err);
  }
}
