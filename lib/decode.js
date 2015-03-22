'use strict';

var hasWorker = require('./has-worker').HAS_WORKER;
var JpegImage = require('./3rd-party/jpg').JpegImage;


module.exports.decode = decode;


/**
 * Decode the JPEG data
 * @param buf Uint8Array
 * @param cb Callback to invoke on completion
 */
function decode(buf, cb) {
  try {
    var j = new JpegImage();
    j.parse(buf);

    var parser = j._parser;
    var obj = {
      get width() {
        return parser.width;
      },
      get height() {
        return parser.height;
      },
      get data() {
        return this.getData(parser.width, parser.height);
      },
      getData: function (width, height) {
        var dest = {
          width: width,
          height: height,
          data: new Uint8Array(width * height * 4)
        };
        j.copyToImageData(dest);
        return dest.data;
      }
    };

    cb(null, obj);
  } catch(err) {
    cb(err);
  }
}
