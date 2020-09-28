import ExifReader from './backend/exif-reader';

/**
 * Read EXIF data from the provided buffer
 *
 * @param buf ArrayBuffer
 * @param options Object { hasMakerNote: true|false }
 * @param cb Callback to invoke on completion
 *
 * @callback Object { name: value, ... }
 */
export default function exif(buf, options, cb) {
  try {
    const tags = ExifReader.load(buf);

    // The MakerNote tag can be really large. Remove it to lower memory usage.
    delete tags['MakerNote'];

    cb(null, tags);
  } catch(err) {
    if(err.message === 'No Exif data') {
      cb(null, {});
    } else {
      cb(err);
    }
  }
}
