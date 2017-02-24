import should from 'should';
import lib from '../src/index';
import constants from './constants';

describe('Info', () => {

  it('can be fetched for a JPEG file', (done) => {
    const buf = constants.buf420;
    lib.info(buf, (err, data) => {
      should.not.exist(err);
      should.exist(data);

      data.should.have.a.property('type').equal('image');
      data.should.have.a.property('mimeType').equal('image/jpeg');
      data.should.have.a.property('extension').equal('jpg');
      data.should.have.a.property('width').equal(1052);
      data.should.have.a.property('height').equal(1052);

      done();
    });
  });

  it('can be fetched for a PNG file', (done) => {
    const buf = constants.bufPng;
    lib.info(buf, (err, data) => {
      should.not.exist(err);
      should.exist(data);

      data.should.have.a.property('type').equal('image');
      data.should.have.a.property('mimeType').equal('image/png');
      data.should.have.a.property('extension').equal('png');
      data.should.have.a.property('width').equal(1052);
      data.should.have.a.property('height').equal(1052);

      done();
    });
  });

  it('cannot be fetched for a broken JPEG file', (done) => {
    const buf = constants.bufBroken;
    lib.info(buf, (err, data) => {
      should.exist(err);
      should.not.exist(data);
      err.should.be.an.instanceOf(Error);
      done();
    });
  });

});