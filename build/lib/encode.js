'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = encode;

var _encoder = require('./backend/encoder');

var _encoder2 = _interopRequireDefault(_encoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Encode the data to JPEG format
 *
 * @param buf Buffer|Uint8Array
 * @param options Object { width: number, height: number, quality: number }
 * @param cb Callback to invoke on completion
 *
 * @callback { width: number, height: number, data: Uint8Array }
 */
function encode(buf, options, cb) {
  try {
    const imageData = {
      data: buf,
      width: options.width,
      height: options.height
    };
    const data = (0, _encoder2.default)(imageData, options.quality);
    cb(null, data);
  } catch (err) {
    cb(err);
  }
}
module.exports = exports['default'];