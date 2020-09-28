import { JPEGEncoder } from './backend/jpg-encode';

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
    const encoder = new JPEGEncoder(options.quality);
    const opts = {
      data: buf,
      width: options.width,
      height: options.height
    }

    const encoded = encoder.encode(opts);

    const result = {
      data: encoded,
      width: options.width,
      height: options.height
    };

    cb(null, result);
  } catch(err) {
    cb(err);
  }
}
