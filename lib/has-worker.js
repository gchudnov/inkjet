'use strict';

var HAS_WORKER = (typeof window !== 'undefined') && ('Worker' in window);
if (HAS_WORKER) {
  try {
    var wkr = require('webworkify')(function () {});
    wkr.terminate();
  } catch (e) {
    HAS_WORKER = false;
  }
}

module.exports.HAS_WORKER = HAS_WORKER;
