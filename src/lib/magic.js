import db from './magic-db';

/**
 * Lookup the magic number in magic-number DB
 * @param {Buffer} buf Data buffer
 * @param {function} cb Callback to invoke on completion
 */
export default function magic(buf, cb) {
  setTimeout(() => {
    const sampleLength = 24;
    const sample = buf.slice(0, sampleLength).toString('hex'); // lookup data

    const found = Object.keys(db).find((it) => { return (sample.indexOf(it) !== -1); });

    if(found) {
      cb(null, db[found]);
    } else {
      cb(new Error('Magic number not found'));
    }
  }, 0);
}
