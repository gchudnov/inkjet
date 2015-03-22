'use strict';

var hasWorker = require('./has-worker').HAS_WORKER;
var ExifReader = require('./3rd-party/ExifReader').ExifReader;


module.exports = exif;


/**
 * Read EXIF data from the provided buffer
 * @param buf
 * @param cb
 */
function exif(buf, cb) {
  try {
    var exif = new ExifReader();
    exif.load(buf);
    var metadata = exif.getAllTags();
    cb(null, metadata);
  } catch(err) {
    cb(err);
  }
}
