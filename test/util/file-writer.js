const fs = require('fs');
const path = require('path');

module.exports.writeFileSync = writeFileSync;

/**
 * Write file to the `out` directory
 * NOTE: this method is used for test in node.js and disabled in browserify
 * @param filepath {string}
 * @param buf {Buffer}
 */
function writeFileSync(filepath, buf) {
  const outDir = path.join(__dirname, '../out');

  if(!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  fs.writeFileSync(filepath, buf);
}
