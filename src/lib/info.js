import imageinfo from 'imageinfo';

/**
 * Get image information
 * @param {Buffer} buf Image or image part that contains image parameters
 * @param {function} cb Callback to invoke on completion
 */
export default function info(buf, cb) {
  setTimeout(() => {
    const info = imageinfo(buf);
    if(!info) {
      cb(new Error('Cannot get image info'));
    } else {
      cb(null, {
        type: info.type,
        mimeType: info.mimeType,
        extension: info.format.toLowerCase(),
        width: info.width,
        height: info.height
      });
    }
  }, 0);
}
