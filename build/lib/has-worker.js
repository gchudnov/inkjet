"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasWorker = void 0;
var hasWorker = typeof window !== 'undefined' && 'Worker' in window;
exports.hasWorker = hasWorker;

if (hasWorker) {
  try {
    var w = require('webworkify')(function () {});

    w.terminate();
  } catch (e) {
    exports.hasWorker = hasWorker = false;
  }
}