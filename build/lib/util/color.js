"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayLikeRgbToRgba = arrayLikeRgbToRgba;

/**
 * Converts a buffer of RGB components to RGBA.
 *
 * @param buf {Buffer|Uint8Array|Uint8ClampedArray} array-like structure with RGB data
 */
function arrayLikeRgbToRgba(buf) {
  var filler = 0xFF;
  var result = new Uint8Array(buf.length / 3 * 4);

  for (var i = 0, p = 0; i < buf.length; i += 3) {
    result[p++] = buf[i];
    result[p++] = buf[i + 1];
    result[p++] = buf[i + 2];
    result[p++] = filler;
  }

  return result;
}