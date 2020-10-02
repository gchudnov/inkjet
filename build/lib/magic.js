"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = magic;

var _magicDb = _interopRequireDefault(require("./magic-db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Lookup the magic number in magic-number DB
 * @param {Buffer} buf Data buffer
 * @param {function} cb Callback to invoke on completion
 */
function magic(buf, cb) {
  setTimeout(function () {
    var sampleLength = 24;
    var sample = buf.slice(0, sampleLength).toString('hex'); // lookup data

    var found = Object.keys(_magicDb["default"]).find(function (it) {
      return sample.indexOf(it) !== -1;
    });

    if (found) {
      cb(null, _magicDb["default"][found]);
    } else {
      cb(new Error('Magic number not found'));
    }
  }, 0);
}