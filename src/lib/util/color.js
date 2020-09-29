

/**
 * Converts a buffer of RGB components to RGBA.
 *
 * @param buf {Buffer|Uint8Array|Uint8ClampedArray} array-like structure with RGB data
 */
export function arrayLikeRgbToRgba(buf) {
  const filler = 0xFF;
  const result = new Uint8Array((buf.length / 3) * 4);

  for(let i = 0, p = 0; i < buf.length; i += 3) {
    result[p++] = buf[i];
    result[p++] = buf[i + 1];
    result[p++] = buf[i + 2];
    result[p++] = filler;
  }

  return result;
}
