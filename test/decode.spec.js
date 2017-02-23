import should from 'should';
import lib from '../index';
import constants from './constants';

describe('Decode', () => {

  it('can be used to process ' + constants.name420, (done) => {
    const jpegData = constants.buf420;
    lib.decode(jpegData, (err, decoded) => {
      should.not.exist(err);
      should.exist(decoded);

      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    });
  });

  it('can be used to process ' + constants.name422h, (done) => {
    const jpegData = constants.buf422h;
    lib.decode(jpegData, (err, decoded) => {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    });
  });

  it('can be used to process ' + constants.name422v, (done) => {
    const jpegData = constants.buf422v;
    lib.decode(jpegData, (err, decoded) => {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    })
  });

  it('can be used to process ' + constants.name444, (done) => {
    const jpegData = constants.buf444;
    lib.decode(jpegData, (err, decoded) => {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    });
  });

  it('can be used to process ' + constants.nameExif, (done) => {
    const jpegData = constants.bufExif;
    lib.decode(jpegData, (err, decoded) => {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    });
  });

  it('fails to decode a broken JPEG image', (done) => {
    const jpegData = constants.bufBroken;
    lib.decode(jpegData, (err, decoded) => {
      should.exist(err);
      should.not.exist(decoded);
      err.should.be.an.instanceOf(Error);
      done();
    });
  });

}).timeout(60000);
