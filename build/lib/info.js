'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = info;

var _imageinfo = require('imageinfo');

var _imageinfo2 = _interopRequireDefault(_imageinfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get image information
 * @param {Buffer} buf Image or image part that contains image parameters
 * @param {function} cb Callback to invoke on completion
 */
function info(buf, cb) {
  setTimeout(() => {
    const info = (0, _imageinfo2.default)(buf);
    if (!info) {
      cb(new Error('Cannot get image info'));
    } else {
      cb(null, {
        type: info.type,
        mimeType: info.mimeType,
        extension: info.format.toLowerCase(),
        width: info.width,
        height: info.height
      });
    }
  }, 0);
}
module.exports = exports['default'];