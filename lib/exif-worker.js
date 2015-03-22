'use strict';

module.exports = function(self) {
  var exif = require('./exif');

  self.onmessage = function (ev) {
    exif(ev.data, function(err, output) {
      if (err) {
        self.postMessage({ err: err });
      } else {
        self.postMessage({ output: output });
      }
    });
  };
};
