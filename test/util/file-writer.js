'use strict';

var fs = require('fs');
var path = require('path');

module.exports.writeFileSync = writeFileSync;

/**
 * Write file to the `out` directory
 * NOTE: this method is used for test in node.js and disabled in browserify
 * @param filepath
 * @param arr
 */
function writeFileSync(filepath, arr) {
  var outDir = path.join(__dirname, '../out');

  if(!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  fs.writeFileSync(filepath, new Buffer(arr));
}
