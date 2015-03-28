'use strict';

var ExifReader = require('./backend/ExifReader').ExifReader;

module.exports = exif;


/**
 * Read EXIF data from the provided buffer
 *
 * @param buf ArrayBuffer
 * @param options Object { hasMakerNote: true|false }
 * @param cb Callback to invoke on completion
 *
 * @callback Object { name: value, ... }
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
