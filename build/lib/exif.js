'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exif;

var _ExifReader = require('./backend/ExifReader');

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
    const exif = new _ExifReader.ExifReader();
    exif.load(buf);

    // The MakerNote tag can be really large. Remove it to lower memory usage.
    if (!options.hasOwnProperty('hasMakerNote') || !options.hasMakerNote) {
      exif.deleteTag('MakerNote');
    }

    const metadata = exif.getAllTags();

    cb(null, metadata);
  } catch (err) {
    if (err.message === 'No Exif data') {
      cb(null, {});
    } else {
      cb(err);
    }
  }
}
module.exports = exports['default'];