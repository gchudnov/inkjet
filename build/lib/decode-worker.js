"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(self) {
  var decode = require('./decode');

  self.onmessage = function (_ref) {
    var msg = _ref.data;
    decode(msg.buf, msg.options, function (err, result) {
      if (err) {
        var errValue = err instanceof Error ? err.message : err; // Error is not clonable

        self.postMessage({
          err: errValue
        });
      } else {
        self.postMessage({
          result: result
        });
      }
    });
  };
}

;