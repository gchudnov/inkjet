import path from 'path';
import should from 'should';
import lib from '../src/index';
import writer from './util/file-writer';

const frameComponents = 4;
const frameWidth = 320;
const frameHeight = 240;
const frameLength = frameWidth * frameHeight * frameComponents;

function initData(frameData, r, g, b) {
  const length = frameData.length || frameData.byteLength;
  const view = (frameData instanceof ArrayBuffer) ? new Uint8Array(frameData) : frameData;

  let i = 0;
  while (i < length) {
    view[i++] = r; // red
    view[i++] = g; // green
    view[i++] = b; // blue
    view[i++] = 0xFF; // alpha - ignored in JPEGs
  }

  return {
    width: frameWidth,
    height: frameHeight,
    data: frameData
  }
}

function makeRgbBuffer(r, g, b) {
  const frameData = Buffer.alloc(frameLength);
  return initData(frameData, r, g, b)
}

function makeRgbArrayBuffer(r, g, b) {
  const frameData = new ArrayBuffer(frameLength);
  return initData(frameData, r, g, b)
}

function makeRgbUint8Array(r, g, b) {
  const frameData = new Uint8Array(frameLength);
  return initData(frameData, r, g, b)
}

function makeRgbUint8ClampedArray(r, g, b) {
  const frameData = new Uint8ClampedArray(frameLength);
  return initData(frameData, r, g, b)
}

describe('Encode', () => {

  it('can be used to create a JPEG image (Buffer)', (done) => {
    const { width, height, data } = makeRgbBuffer(0xFF, 0, 0);

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
    const { width, height, data } = makeRgbArrayBuffer( 0, 0xFF, 0);

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
    const { width, height, data } = makeRgbUint8Array(0, 0, 0xFF);

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
    const { width, height, data } = makeRgbUint8ClampedArray(0, 0xFF, 0xFF);

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
