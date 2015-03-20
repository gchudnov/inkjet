'use strict';

module.exports.toArrayBuffer = toArrayBuffer;
module.exports.toBuffer = toBuffer;

/**
 * Buffer -> ArrayBuffer
 * @param buffer
 * @returns {ArrayBuffer}
 */
function toArrayBuffer(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
}

/**
 * ArrayBuffer -> Buffer
 * @param ab
 * @returns {Buffer}
 */
function toBuffer(ab) {
  return new Buffer( new Uint8Array(ab) );
}
