"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exif;

var _exifReader = _interopRequireDefault(require("./backend/exif-reader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    var tags = _exifReader["default"].load(buf); // The MakerNote tag can be really large. Remove it to lower memory usage.


    delete tags['MakerNote'];
    cb(null, tags);
  } catch (err) {
    if (err.message === 'No Exif data') {
      cb(null, {});
    } else {
      cb(err);
    }
  }
}