'use strict';

module.exports = function(self) {
  var encode = require('./encode');

  self.onmessage = function (ev) {
    var msg = ev.data;
    encode(msg.buf, msg.options, function(err, result) {
      if (err) {
        var errValue = err instanceof Error ? err.message : err; // Error is not clonable
        self.postMessage({ err: errValue });
      } else {
        self.postMessage({ result: result });
      }
    });
  };
};
