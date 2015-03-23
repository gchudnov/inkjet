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
  try {
    var exif = new ExifReader();
    exif.load(buf);

    // The MakerNote tag can be really large. Remove it to lower memory usage.
    if(!options.hasOwnProperty('hasMakerNote') || !options.hasMakerNote) {
      exif.deleteTag('MakerNote');
    }

    var metadata = exif.getAllTags();

    cb(null, metadata);
  } catch(err) {
    cb(err);
  }
}
