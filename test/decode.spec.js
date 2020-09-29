import should from 'should';
import lib from '../src/index';
import constants from './util/constants';

describe('Decode', () => {

  it('can be used to process ' + constants.name420, (done) => {
    const jpegData = constants.buf420;
    lib.decode(jpegData, (err, decoded) => {
      should.not.exist(err);
      should.exist(decoded);

      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data.buffer).should.be.instanceOf(ArrayBuffer);
      done(err);
    });
  });

  it('can be used to process ' + constants.name422h, (done) => {
    const jpegData = constants.buf422h;
    lib.decode(jpegData, (err, decoded) => {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data.buffer).should.be.instanceOf(ArrayBuffer);
      done(err);
    });
  });

  it('can be used to process ' + constants.name422v, (done) => {
    const jpegData = constants.buf422v;
    lib.decode(jpegData, (err, decoded) => {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data.buffer).should.be.instanceOf(ArrayBuffer);
      done(err);
    })
  });

  it('can be used to process ' + constants.name444, (done) => {
    const jpegData = constants.buf444;
    lib.decode(jpegData, (err, decoded) => {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data.buffer).should.be.instanceOf(ArrayBuffer);
      done(err);
    });
  });

  it('fail to process ' + constants.nameAC, (done) => {
    const jpegData = constants.bufAC;
    lib.decode(jpegData, (err, decoded) => {
      should.exist(err);
      should.not.exist(decoded);
      err.should.be.an.instanceOf(Error);
      done(decoded);
    });
  });

  it('can be used to process ' + constants.nameP, (done) => {
    const jpegData = constants.bufP;
    lib.decode(jpegData, (err, decoded) => {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data.buffer).should.be.instanceOf(ArrayBuffer);
      done(err);
    });
  });

  it('can be used to process ' + constants.nameDCTF, (done) => {
    const jpegData = constants.bufDCTF;
    lib.decode(jpegData, (err, decoded) => {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data.buffer).should.be.instanceOf(ArrayBuffer);
      done(err);
    });
  });

  it('can be used to process ' + constants.nameCP, (done) => {
    const jpegData = constants.bufCP;
    lib.decode(jpegData, (err, decoded) => {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data.buffer).should.be.instanceOf(ArrayBuffer);
      done(err);
    });
  });

  it('can be used to process ' + constants.nameExif, (done) => {
    const jpegData = constants.bufExif;
    lib.decode(jpegData, (err, decoded) => {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data.buffer).should.be.instanceOf(ArrayBuffer);
      done(err);
    });
  });

  it('fails to decode a broken JPEG image', (done) => {
    const jpegData = constants.bufBroken;
    lib.decode(jpegData, (err, decoded) => {
      should.exist(err);
      should.not.exist(decoded);
      err.should.be.an.instanceOf(Error);
      done(decoded);
    });
  });

}).timeout(60000);
