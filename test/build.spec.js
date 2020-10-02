import should from 'should';

import lib from '../build/index';
import constants from './util/constants';
import init from './util/init';

const frameWidth = init.frameWidth;
const frameHeight = init.frameHeight;

describe('Build', () => {

  it('an image can be decoded ' + constants.name420, (done) => {
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

  it('an image can be encoded', (done) => {
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

      done(err);
    });
  });

});
