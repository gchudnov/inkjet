import path from 'path';
import should from 'should';
import lib from '../index';
import writer from './util/file-writer';

function makeRgbBitmap(BufferType, r, g, b) {
  const width = 320;
  const height = 180;
  const frameData = new Buffer(width * height * 4);
  let i = 0;

  while (i < frameData.length) {
    frameData[i++] = 0xFF; // red
    frameData[i++] = 0x00; // green
    frameData[i++] = 0x00; // blue
    frameData[i++] = 0xFF; // alpha - ignored in JPEGs
  }

  return {
    width: width,
    height: height,
    data: frameData
  }
}

describe('Encode', () => {

  it('can be used to create a JPEG image (Buffer)', (done) => {
    const { width, height, data } = makeRgbBitmap(Buffer, 0xFF, 0, 0);

    const options = {
      width: width,
      height: height,
      quality: 80
    };

    lib.encode(data, options, (err, encoded) => {
      should.not.exist(err);
      should.exist(encoded);
      (encoded.width).should.be.eql(320);
      (encoded.height).should.be.eql(180);
      (encoded.data).should.be.instanceOf(Uint8Array);

      if('writeFileSync' in writer) {
        writer.writeFileSync(path.join(__dirname, './out/' + 'encoded-red.jpg'), encoded.data);
      }

      done();
    });

  });

  it('can be used to create a JPEG image (ArrayBuffer)', (done) => {
    const { width, height, data } = makeRgbBitmap(ArrayBuffer, 0, 0xFF, 0);

    const options = {
      width: width,
      height: height,
      quality: 80
    };

    lib.encode(data, options, (err, encoded) => {
      should.not.exist(err);
      should.exist(encoded);
      (encoded.width).should.be.eql(320);
      (encoded.height).should.be.eql(180);
      (encoded.data).should.be.instanceOf(Uint8Array);

      if('writeFileSync' in writer) {
        writer.writeFileSync(path.join(__dirname, './out/' + 'encoded-green.jpg'), encoded.data);
      }

      done();
    });

  });

  it('can be used to create a JPEG image (Uint8Array)', (done) => {
    const { width, height, data } = makeRgbBitmap(Uint8Array, 0, 0, 0xFF);

    const options = {
      width: width,
      height: height,
      quality: 80
    };

    lib.encode(data, options, (err, encoded) => {
      should.not.exist(err);
      should.exist(encoded);
      (encoded.width).should.be.eql(320);
      (encoded.height).should.be.eql(180);
      (encoded.data).should.be.instanceOf(Uint8Array);

      if('writeFileSync' in writer) {
        writer.writeFileSync(path.join(__dirname, './out/' + 'encoded-blue.jpg'), encoded.data);
      }

      done();
    });

  });

}).timeout(60000);
