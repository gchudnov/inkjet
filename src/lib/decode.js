import { JpegImage } from './backend/jpg';

/**
 * Decode the JPEG data
 *
 * @param buf Uint8Array
 * @param options Object { width: number, height: number }
 * @param cb Callback to invoke on completion
 *
 * @callback { width: number, height: number, data: Uint8Array }
 */
export default function decode(buf, options, cb) {

  // returns: Uint8ClampedArray(width * height * numComponents)
  function getData(j, width, height) {
    const opts = {
      width: width,
      height: height,
      forceRGB: true,
      isSourcePDF: false
    };

    return j.getData(opts);
  }

  try {
    const j = new JpegImage();
    j.parse(buf);

    const width = options.width || j.width;
    const height = options.height || j.height;
    const data = getData(j, width, height);

    const result = {
      width: width,
      height: height,
      data: data
    };

    cb(null, result);
  } catch(err) {
    if(typeof err === 'string') {
      // jpg.js throws 'string' values, convert to an Error
      err = new Error(err);
    }
    cb(err);
  }
}
