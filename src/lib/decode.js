import { JpegImage } from './backend/jpg';
import { arrayLikeRgbToRgba } from './util/color';

/**
 * Decode the JPEG data
 *
 * @param buf ArrayLike data structure
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
    const rgbData = getData(j, width, height);    // NOTE: each color is RGB without alpha-channel
    const rgbaData = arrayLikeRgbToRgba(rgbData); // NOTE: convert to RGBA

    const result = {
      width: width,
      height: height,
      data: rgbaData
    };

    cb(null, result);
  } catch(err) {
    cb(err);
  }
}
