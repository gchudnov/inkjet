'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = magic;

var _magicDb = require('./magic-db');

var _magicDb2 = _interopRequireDefault(_magicDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Lookup the magic number in magic-number DB
 * @param {Buffer} buf Data buffer
 * @param {function} cb Callback to invoke on completion
 */
function magic(buf, cb) {
  setTimeout(() => {
    const sampleLength = 24;
    const sample = buf.slice(0, sampleLength).toString('hex'); // lookup data

    const found = Object.keys(_magicDb2.default).find(it => {
      return sample.indexOf(it) != -1;
    });

    if (found) {
      cb(null, _magicDb2.default[found]);
    } else {
      cb(new Error('Magic number not found'));
    }
  }, 0);
}
module.exports = exports['default'];