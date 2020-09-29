import should from 'should';
import lib from '../src/index';
import constants from './util/constants';

describe('Magic number', () => {

  it('can be detected for a JPEG Buffer', (done) => {
    const buf = Buffer.from([0xFF, 0xD8, 0xFF]);

    lib.magic(buf, (err, result) => {
      should.not.exist(err);
      should.exist(result);

      result.mimeType.should.be.equal('image/jpeg');
      result.extension.should.be.equal('jpg');

      done();
    });
  });

  it('can be detected for a JPEG ArrayBuffer', (done) => {
    const buf = new ArrayBuffer(3);
    const view = new Uint8Array(buf);
    view[0] = 0xFF;
    view[1] = 0xD8;
    view[2] = 0xFF;

    lib.magic(buf, (err, result) => {
      should.not.exist(err);
      should.exist(result);

      result.mimeType.should.be.equal('image/jpeg');
      result.extension.should.be.equal('jpg');

      done();
    });
  });

  it('can be detected for a JPEG Uint8Array', (done) => {
    const buf = new ArrayBuffer(3);
    const view = new Uint8Array(buf);
    view[0] = 0xFF;
    view[1] = 0xD8;
    view[2] = 0xFF;

    lib.magic(view, (err, result) => {
      should.not.exist(err);
      should.exist(result);

      result.mimeType.should.be.equal('image/jpeg');
      result.extension.should.be.equal('jpg');

      done();
    });
  });

  it('can be detected for a JPEG Uint8ClampedArray', (done) => {
    const buf = new ArrayBuffer(3);
    const view = new Uint8ClampedArray(buf);
    view[0] = 0xFF;
    view[1] = 0xD8;
    view[2] = 0xFF;

    lib.magic(view, (err, result) => {
      should.not.exist(err);
      should.exist(result);

      result.mimeType.should.be.equal('image/jpeg');
      result.extension.should.be.equal('jpg');

      done();
    });
  });

  it('can be detected for a JPEG file', (done) => {
    const buf = constants.buf420;

    lib.magic(buf, (err, result) => {
      should.not.exist(err);
      should.exist(result);

      result.mimeType.should.be.equal('image/jpeg');
      result.extension.should.be.equal('jpg');

      done();
    });
  });

  it('can be detected for a PNG file', (done) => {
    const buf = constants.bufPng;

    lib.magic(buf, (err, result) => {
      should.not.exist(err);
      should.exist(result);

      result.mimeType.should.be.equal('image/png');
      result.extension.should.be.equal('png');

      done();
    });
  });

  it('cannot be detected for a broken JPEG file', (done) => {
    const buf = constants.bufBroken;

    lib.magic(buf, (err, result) => {
      should.exist(err);
      should.not.exist(result);
      err.should.be.an.instanceOf(Error);
      done();
    });
  });

});
