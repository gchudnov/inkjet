import encoder from './backend/encoder';

/**
 * Encode the data to JPEG format
 *
 * @param buf Buffer|Uint8Array
 * @param options Object { width: number, height: number, quality: number }
 * @param cb Callback to invoke on completion
 *
 * @callback { width: number, height: number, data: Uint8Array }
 */
export default function encode(buf, options, cb) {
  try {
    const imageData = {
      data: buf,
      width: options.width,
      height: options.height
    };
    const data = encoder(imageData, options.quality);
    cb(null, data);
  } catch(err) {
    cb(err);
  }
}
