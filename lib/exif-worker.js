'use strict';

module.exports = function(self) {
  var exif = require('./exif');

  self.onmessage = function (ev) {
    var msg = ev.data;
    exif(msg.buf, {}, function(err, result) {
      if (err) {
        var errValue = err instanceof Error ? err.message : err; // Error is not clonable
        self.postMessage({ err: errValue });
      } else {
        self.postMessage({ result: result });
      }
    });
  };
};
