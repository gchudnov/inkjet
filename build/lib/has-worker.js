'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let hasWorker = typeof window !== 'undefined' && 'Worker' in window;

if (hasWorker) {
  try {
    const w = require('webworkify')(() => {});
    w.terminate();
  } catch (e) {
    exports.hasWorker = hasWorker = false;
  }
}

exports.hasWorker = hasWorker;