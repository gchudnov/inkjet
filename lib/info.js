'use strict';

var imageinfo = require('imageinfo');

module.exports.collect = collect;

/**
 * Get image information
 * @param {Buffer} buf Image or image part that contains image parameters
 * @param {function} cb Callback to invoke on completion
 */
function collect(buf, cb) {
  setTimeout(function() {
    var info = imageinfo(buf);
    if(!info) {
      cb();
    } else {
      cb(null, {
        type: info.type,
        mimeType: info.mimeType,
        extension: info.format.toLowerCase(),
        width: info.width,
        height: info.height
      });
    }
  }, 0);
}