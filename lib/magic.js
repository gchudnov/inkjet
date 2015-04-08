'use strict';

var find = require('lodash.find');
var db = require('./magic-db');
var debug = require('debug')('inkjet:magic');

module.exports.lookup = lookup;

/**
 * Lookup the magic number in magic-number DB
 * @param {Buffer} buf Data buffer
 * @param {function} cb Callback to invoke on completion
 */
function lookup(buf, cb) {
  setTimeout(function() {
    var sampleLength = 24;
    var sample = buf.slice(0, sampleLength).toString('hex'); // lookup data

    var keys = Object.keys(db);
    var found = find(keys, function(it) {
      debug('%s <---- %s', sample, it);
      return (sample.indexOf(it) != -1);
    });

    if(found) {
      cb(null, db[found]);
    } else {
      cb();
    }
  }, 0);
}
