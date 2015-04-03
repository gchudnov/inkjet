'use strict';

var hasWorker = (typeof window !== 'undefined') && ('Worker' in window);
if (hasWorker) {
  try {
    var w = require('webworkify')(function () {});
    w.terminate();
  } catch (e) {
    hasWorker = false;
  }
}

module.exports.HAS_WORKER = hasWorker;
