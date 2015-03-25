'use strict';

module.exports.toArrayBuffer = toArrayBuffer;
module.exports.toUint8Array = toUint8Array;
module.exports.toArrayLike = toArrayLike;

module.exports.bufferToArrayBuffer = bufferToArrayBuffer;
module.exports.arrayBufferToBuffer = arrayBufferToBuffer;

/**
 * Converts any buffer to ArrayBuffer
 * @param buf Buffer|ArrayBuffer|Uint8Array
 * @returns ArrayBuffer
 */
function toArrayBuffer(buf) {
  if(buf instanceof ArrayBuffer) {
    return buf;
  } else if((typeof global !== 'undefined') && ('Buffer' in global) && (buf instanceof global.Buffer)) {
    return bufferToArrayBuffer(buf);
  } else if(buf instanceof Uint8Array) {
    return bufferToArrayBuffer(buf);
  } else {
    return buf; // type unknown, trust the user
  }
}

/**
 * Converts any buffer to Uint8Array
 * @param buf Buffer|ArrayBuffer|Uint8Array
 * @returns Uint8Array
 */
function toUint8Array(buf) {
  if(buf instanceof Uint8Array) {
    return buf;
  } else if(buf instanceof ArrayBuffer) {
    return new Uint8Array(buf);
  } else if((typeof global !== 'undefined') && ('Buffer' in global) && (buf instanceof global.Buffer)) {
    return new Uint8Array(buf);
  } else {
    return buf; // type unknown, trust the user
  }
}

/**
 * Convert any buffer to array like structure: Uint8Array|Buffer
 * @param buf Buffer|ArrayBuffer|Uint8Array
 * @returns Buffer|Uint8Array
 */
function toArrayLike(buf) {
  if(buf instanceof Uint8Array) {
    return buf;
  } else if(buf instanceof ArrayBuffer) {
    return new Uint8Array(buf);
  } else if((typeof global !== 'undefined') && ('Buffer' in global) && (buf instanceof global.Buffer)) {
    return buf;
  } else {
    return buf; // type unknown, trust the user
  }
}

/**
 * Buffer -> ArrayBuffer
 * @param buf Buffer|Uint8Array
 * @returns ArrayBuffer
 */
function bufferToArrayBuffer(buf) {
  var arr = new ArrayBuffer(buf.length);
  var view = new Uint8Array(arr);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return arr;
}

/**
 * ArrayBuffer -> Buffer
 * @param arr
 * @returns {Buffer}
 */
function arrayBufferToBuffer(arr) {
  return new Buffer(new Uint8Array(arr));
}
