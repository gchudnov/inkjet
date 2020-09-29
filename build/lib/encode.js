"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = encode;

var _jpgEncode = require("./backend/jpg-encode");

/**
 * Encode the data to JPEG format
 *
 * @param buf Buffer|Uint8Array
 * @param options Object { width: number, height: number, quality: number }
 * @param cb Callback to invoke on completion
 *
 * @callback { width: number, height: number, data: Uint8Array }
 */
function encode(buf, options, cb) {
  try {
    var encoder = new _jpgEncode.JPEGEncoder(options.quality);
    var opts = {
      data: buf,
      width: options.width,
      height: options.height
    };
    var encoded = encoder.encode(opts);
    var result = {
      data: encoded,
      width: options.width,
      height: options.height
    };
    cb(null, result);
  } catch (err) {
    cb(err);
  }
}