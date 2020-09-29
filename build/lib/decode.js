"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = decode;

var _jpg = require("./backend/jpg");

var _color = require("./util/color");

/**
 * Decode the JPEG data
 *
 * @param buf ArrayLike data structure
 * @param options Object { width: number, height: number }
 * @param cb Callback to invoke on completion
 *
 * @callback { width: number, height: number, data: Uint8Array }
 */
function decode(buf, options, cb) {
  // returns: Uint8ClampedArray(width * height * numComponents)
  function getData(j, width, height) {
    var opts = {
      width: width,
      height: height,
      forceRGB: true,
      isSourcePDF: false
    };
    return j.getData(opts);
  }

  try {
    var j = new _jpg.JpegImage();
    j.parse(buf);
    var width = options.width || j.width;
    var height = options.height || j.height;
    var rgbData = getData(j, width, height); // NOTE: each color is RGB without alpha-channel

    var rgbaData = (0, _color.arrayLikeRgbToRgba)(rgbData); // NOTE: convert to RGBA

    var result = {
      width: width,
      height: height,
      data: rgbaData
    };
    cb(null, result);
  } catch (err) {
    cb(err);
  }
}