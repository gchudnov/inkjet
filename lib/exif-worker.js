'use strict';

module.exports = function(self) {
  var exif = require('./exif');

  self.onmessage = function (ev) {
    var msg = ev.data;
    exif(msg.buf, function(err, result) {
      if (err) {
        self.postMessage({ err: err });
      } else {
        self.postMessage({ result: result });
      }
    });
  };
};
