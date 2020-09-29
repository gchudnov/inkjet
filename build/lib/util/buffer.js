"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBuffer = toBuffer;
exports.toArrayBuffer = toArrayBuffer;
exports.toArrayLike = toArrayLike;

/**
 * Converts the buffer to Buffer
 * @param {Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray} buf Input buffer
 * @returns {Buffer}
 */
function toBuffer(buf) {
  if (buf instanceof ArrayBuffer) {
    return arrayBufferToBuffer(buf);
  } else if (Buffer.isBuffer(buf)) {
    return buf;
  } else if (buf instanceof Uint8Array || buf instanceof Uint8ClampedArray) {
    return Buffer.from(buf);
  } else {
    return buf; // type unknown, trust the user
  }
}
/**
 * Converts any buffer to ArrayBuffer
 * @param {Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray} buf Input buffer
 * @returns {ArrayBuffer}
 */


function toArrayBuffer(buf) {
  if (buf instanceof ArrayBuffer) {
    return buf;
  } else if (Buffer.isBuffer(buf)) {
    return arrayLikeToArrayBuffer(buf);
  } else if (buf instanceof Uint8Array || buf instanceof Uint8ClampedArray) {
    return arrayLikeToArrayBuffer(buf);
  } else {
    return buf; // type unknown, trust the user
  }
}
/**
 * Convert any buffer to array-like type: Uint8Array|Uint8ClampedArray|Buffer
 * @param {Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray} buf
 * @returns {Buffer|Uint8Array}
 */


function toArrayLike(buf) {
  if (buf instanceof Uint8Array || buf instanceof Uint8ClampedArray) {
    return buf;
  } else if (buf instanceof ArrayBuffer) {
    return new Uint8Array(buf);
  } else if (Buffer.isBuffer(buf)) {
    return buf;
  } else {
    return buf; // type unknown, trust the user
  }
}
/**
 * Converts Buffer to ArrayBuffer
 *
 * NOTE: we cannot convert Buffer to ArrayBuffer via `buf.buffer` since the size of the returned ArrayBuffer might be biger than the actual.
 *
 * @param {Buffer|Uint8Array|Uint8ClampedArray} buf
 * @returns {ArrayBuffer}
 */


function arrayLikeToArrayBuffer(buf) {
  var arrBuf = new ArrayBuffer(buf.length);
  var view = new Uint8Array(arrBuf);

  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }

  return arrBuf;
}
/**
 * Convert ArrayBuffer to Buffer
 * @param {ArrayBuffer} arrBuf
 * @returns {Buffer}
 */


function arrayBufferToBuffer(arrBuf) {
  return Buffer.from(new Uint8Array(arrBuf));
}