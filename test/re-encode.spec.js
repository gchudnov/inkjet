import should from 'should';
import path from 'path';
import lib from '../index';
import constants from './constants';
import writer from './util/file-writer';

describe('Re-Encode', () => {

  it('can be used to process ' + constants.name420, (done) => {
    const jpegData = constants.buf420;
    lib.decode(jpegData, (err, decoded) => {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);

      const buf = decoded.data;
      const options = {
        width: decoded.width,
        height: decoded.height,
        quality: 80
      };

      lib.encode(buf, options, (err, encoded) => {
        should.not.exist(err);
        should.exist(encoded);
        (encoded.width).should.be.eql(1052);
        (encoded.height).should.be.eql(1052);
        (encoded.data).should.be.instanceOf(Uint8Array);

        if('writeFileSync' in writer) {
          writer.writeFileSync(path.join(__dirname, './out/' + constants.name420), encoded.data);
        }

        done();
      });
    });
  });

  it('can be used to process ' + constants.name422h, (done) => {
    const jpegData = constants.buf422h;
    lib.decode(jpegData, { width: 1052, height: 1052 }, (err, decoded) => {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);

      const buf = decoded.data;
      const options = {
        width: decoded.width,
        height: decoded.height,
        quality: 80
      };

      lib.encode(buf, options, (err, encoded) => {
        should.not.exist(err);
        should.exist(encoded);
        (encoded.width).should.be.eql(1052);
        (encoded.height).should.be.eql(1052);
        (encoded.data).should.be.instanceOf(Uint8Array);

        if('writeFileSync' in writer) {
          writer.writeFileSync(path.join(__dirname, './out/' + constants.name422h), encoded.data);
        }

        done();
      });
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

      const buf = decoded.data;
      const options = {
        width: decoded.width,
        height: decoded.height,
        quality: 80
      };

      lib.encode(buf, options, (err, encoded) => {
        should.not.exist(err);
        should.exist(encoded);
        (encoded.width).should.be.eql(1052);
        (encoded.height).should.be.eql(1052);
        (encoded.data).should.be.instanceOf(Uint8Array);

        if('writeFileSync' in writer) {
          writer.writeFileSync(path.join(__dirname, './out/' + constants.name422v), encoded.data);
        }

        done();
      });
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

      const buf = decoded.data;
      const options = {
        width: decoded.width,
        height: decoded.height,
        quality: 80
      };

      lib.encode(buf, options, (err, encoded) => {
        should.not.exist(err);
        should.exist(encoded);
        (encoded.width).should.be.eql(1052);
        (encoded.height).should.be.eql(1052);
        (encoded.data).should.be.instanceOf(Uint8Array);

        if('writeFileSync' in writer) {
          writer.writeFileSync(path.join(__dirname, './out/' + constants.nameExif), encoded.data);
        }

        done();
      });
    });
  });

}).timeout(60000);
