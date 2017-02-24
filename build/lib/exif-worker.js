'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (self) {
  const exif = require('./exif');
  self.onmessage = ({ data: msg }) => {
    exif(msg.buf, {}, (err, result) => {
      if (err) {
        const errValue = err instanceof Error ? err.message : err; // Error is not clonable
        self.postMessage({ err: errValue });
      } else {
        self.postMessage({ result: result });
      }
    });
  };
};

;
module.exports = exports['default'];