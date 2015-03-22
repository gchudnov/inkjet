'use strict';

module.exports = function(self) {
  var encode = require('./encode');

  self.onmessage = function (ev) {
    encode(ev.data, ev.quality, function(err, output) {
      if (err) {
        self.postMessage({ err: err });
      } else {
        self.postMessage({ output: output }, [ output.data ]);
      }
    });
  };
};
