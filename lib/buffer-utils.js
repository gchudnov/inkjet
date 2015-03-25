'use strict';

module.exports.toArrayBuffer = toArrayBuffer;
module.exports.toUint8Array = toUint8Array;

module.exports.bufferToArrayBuffer = bufferToArrayBuffer;
module.exports.arrayBufferToBuffer = arrayBufferToBuffer;

/**
 * Converts any buffer to ArrayBuffer
 * @param buf ArrayBuffer|Buffer
 * @returns ArrayBuffer
 */
function toArrayBuffer(buf) {
  if(buf instanceof ArrayBuffer) {
    return buf;
  } else if((typeof global !== 'undefined') && ('Buffer' in global) && (buf instanceof global.Buffer)) {
    return bufferToArrayBuffer(buf);
  } else {
    throw new Error('Input buffer not supported');
  }
}

/**
 * Convers any buffer to Uint8Array
 * @param buf Uint8Array|ArrayBuffer|Buffer
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
    throw new Error('Input buffer not supported');
  }
}

/**
 * Buffer -> ArrayBuffer
 * @param buf Buffer
 * @returns ArrayBuffer
 */
function bufferToArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

/**
 * ArrayBuffer -> Buffer
 * @param arr
 * @returns {Buffer}
 */
function arrayBufferToBuffer(arr) {
  return new Buffer(new Uint8Array(arr));
}
