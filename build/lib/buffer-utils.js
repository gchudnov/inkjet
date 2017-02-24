"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBuffer = toBuffer;
exports.toArrayBuffer = toArrayBuffer;
exports.toUint8Array = toUint8Array;
exports.toArrayLike = toArrayLike;
exports.bufferToArrayBuffer = bufferToArrayBuffer;
exports.arrayBufferToBuffer = arrayBufferToBuffer;

/**
 * Converts the buffer to Buffer
 * @param {Buffer|ArrayBuffer|Uint8Array} buf Input buffer
 * @returns {Buffer}
 */
function toBuffer(buf) {
  if (buf instanceof ArrayBuffer) {
    return arrayBufferToBuffer(buf);
  } else if (Buffer.isBuffer(buf)) {
    return buf;
  } else if (buf instanceof Uint8Array) {
    return new Buffer(buf);
  } else {
    return buf; // type unknown, trust the user
  }
}

/**
 * Converts any buffer to ArrayBuffer
 * @param {Buffer|ArrayBuffer|Uint8Array} buf Input buffer
 * @returns {ArrayBuffer}
 */
function toArrayBuffer(buf) {
  if (buf instanceof ArrayBuffer) {
    return buf;
  } else if (Buffer.isBuffer(buf)) {
    return bufferToArrayBuffer(buf);
  } else if (buf instanceof Uint8Array) {
    return bufferToArrayBuffer(buf);
  } else {
    return buf; // type unknown, trust the user
  }
}

/**
 * Converts any buffer to Uint8Array
 * @param {Buffer|ArrayBuffer|Uint8Array} buf Input buffer
 * @returns {Uint8Array}
 */
function toUint8Array(buf) {
  if (buf instanceof Uint8Array) {
    return buf;
  } else if (buf instanceof ArrayBuffer) {
    return new Uint8Array(buf);
  } else if (Buffer.isBuffer(buf)) {
    return new Uint8Array(buf);
  } else {
    return buf; // type unknown, trust the user
  }
}

/**
 * Convert any buffer to array-like type: Uint8Array|Buffer
 * @param {Buffer|ArrayBuffer|Uint8Array} buf
 * @returns {Buffer|Uint8Array}
 */
function toArrayLike(buf) {
  if (buf instanceof Uint8Array) {
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
 * Buffer -> ArrayBuffer
 * @param {Buffer|Uint8Array} buf
 * @returns {ArrayBuffer}
 */
function bufferToArrayBuffer(buf) {
  const arr = new ArrayBuffer(buf.length);
  const view = new Uint8Array(arr);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return arr;
}

/**
 * ArrayBuffer -> Buffer
 * @param {ArrayBuffer} arr
 * @returns {Buffer}
 */
function arrayBufferToBuffer(arr) {
  return new Buffer(new Uint8Array(arr));
}