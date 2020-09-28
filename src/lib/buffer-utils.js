
/**
 * Converts the buffer to Buffer
 * @param {Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray} buf Input buffer
 * @returns {Buffer}
 */
export function toBuffer(buf) {
  if(buf instanceof ArrayBuffer) {
    return arrayBufferToBuffer(buf);
  } else if(Buffer.isBuffer(buf)) {
    return buf;
  } else if(buf instanceof Uint8Array || buf instanceof Uint8ClampedArray) {
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
export function toArrayBuffer(buf) {
  if(buf instanceof ArrayBuffer) {
    return buf;
  } else if(Buffer.isBuffer(buf)) {
    return bufferToArrayBuffer(buf);
  } else if(buf instanceof Uint8Array || buf instanceof Uint8ClampedArray) {
    return bufferToArrayBuffer(buf);
  } else {
    return buf; // type unknown, trust the user
  }
}

/**
 * Converts any buffer to Uint8Array
 * @param {Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray} buf Input buffer
 * @returns {Uint8Array}
 */
export function toUint8Array(buf) {
  if(buf instanceof Uint8Array || buf instanceof Uint8ClampedArray) {
    return buf;
  } else if(buf instanceof ArrayBuffer) {
    return new Uint8Array(buf);
  } else if(Buffer.isBuffer(buf)) {
    return new Uint8Array(buf);
  } else {
    return buf; // type unknown, trust the user
  }
}

/**
 * Convert any buffer to array-like type: Uint8Array|Uint8ClampedArray|Buffer
 * @param {Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray} buf
 * @returns {Buffer|Uint8Array}
 */
export function toArrayLike(buf) {
  if(buf instanceof Uint8Array || buf instanceof Uint8ClampedArray) {
    return buf;
  } else if(buf instanceof ArrayBuffer) {
    return new Uint8Array(buf);
  } else if(Buffer.isBuffer(buf)) {
    return buf;
  } else {
    return buf; // type unknown, trust the user
  }
}

/**
 * Converts Buffer to ArrayBuffer
 * @param {Buffer|Uint8Array|Uint8ClampedArray} buf
 * @returns {ArrayBuffer}
 */
export function bufferToArrayBuffer(buf) {
  const arr = new ArrayBuffer(buf.length);
  const view = new Uint8Array(arr);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return arr;
}

/**
 * Convert ArrayBuffer to Buffer
 * @param {ArrayBuffer} arrBuf
 * @returns {Buffer}
 */
export function arrayBufferToBuffer(arrBuf) {
  return Buffer.from(new Uint8Array(arrBuf));
}
