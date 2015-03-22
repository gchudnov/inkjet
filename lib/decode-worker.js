'use strict';

module.exports = function(self) {
  var decode = require('./decode');

  self.onmessage = function (ev) {
    decode(ev.data, ev.options, function(err, output) {
      if (err) {
        self.postMessage({ err: err });
      } else {
        self.postMessage({ output: output }, [ output.data ]);
      }
    });
  };
};
