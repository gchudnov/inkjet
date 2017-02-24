'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (self) {
  const decode = require('./decode');
  self.onmessage = ({ data: msg }) => {
    decode(msg.buf, msg.options, (err, result) => {
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