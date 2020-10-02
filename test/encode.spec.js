import path from 'path';
import should from 'should';
import lib from '../src/index';
import writer from './util/file-writer';
import init from './util/init';

const frameWidth = init.frameWidth;
const frameHeight = init.frameHeight;

describe('Encode', () => {

  it('can be used to create a JPEG image (Buffer)', (done) => {
    const { width, height, data } = init.makeRgbBuffer(0xFF, 0, 0);

    const options = {
      width: width,
      height: height,
      quality: 80
    };

    lib.encode(data, options, (err, encoded) => {
      should.not.exist(err);
      should.exist(encoded);
      (encoded.width).should.be.eql(frameWidth);
      (encoded.height).should.be.eql(frameHeight);
      (encoded.data).should.be.instanceOf(Uint8Array);

      if('writeFileSync' in writer) {
        writer.writeFileSync(path.join(__dirname, './out/' + 'encoded-red.jpg'), encoded.data);
      }

      done(err);
    });
  });

  it('can be used to create a JPEG image (ArrayBuffer)', (done) => {
    const { width, height, data } = init.makeRgbArrayBuffer( 0, 0xFF, 0);

    const options = {
      width: width,
      height: height,
      quality: 80
    };

    lib.encode(data, options, (err, encoded) => {
      should.not.exist(err);
      should.exist(encoded);
      (encoded.width).should.be.eql(frameWidth);
      (encoded.height).should.be.eql(frameHeight);
      (encoded.data).should.be.instanceOf(Uint8Array);

      if('writeFileSync' in writer) {
        writer.writeFileSync(path.join(__dirname, './out/' + 'encoded-green.jpg'), encoded.data);
      }

      done(err);
    });
  });

  it('can be used to create a JPEG image (Uint8Array)', (done) => {
    const { width, height, data } = init.makeRgbUint8Array(0, 0, 0xFF);

    const options = {
      width: width,
      height: height,
      quality: 80
    };

    lib.encode(data, options, (err, encoded) => {
      should.not.exist(err);
      should.exist(encoded);
      (encoded.width).should.be.eql(frameWidth);
      (encoded.height).should.be.eql(frameHeight);
      (encoded.data).should.be.instanceOf(Uint8Array);

      if('writeFileSync' in writer) {
        writer.writeFileSync(path.join(__dirname, './out/' + 'encoded-blue.jpg'), encoded.data);
      }

      done(err);
    });
  });

  it('can be used to create a JPEG image (Uint8ClampedArray)', (done) => {
    const { width, height, data } = init.makeRgbUint8ClampedArray(0, 0xFF, 0xFF);

    const options = {
      width: width,
      height: height,
      quality: 80
    };

    lib.encode(data, options, (err, encoded) => {
      should.not.exist(err);
      should.exist(encoded);
      (encoded.width).should.be.eql(frameWidth);
      (encoded.height).should.be.eql(frameHeight);
      (encoded.data).should.be.instanceOf(Uint8Array);

      if('writeFileSync' in writer) {
        writer.writeFileSync(path.join(__dirname, './out/' + 'encoded-cyan.jpg'), encoded.data);
      }

      done(err);
    });
  });

}).timeout(60000);
