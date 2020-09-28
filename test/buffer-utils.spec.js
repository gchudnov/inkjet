import {toBuffer} from '../src/lib/buffer-utils';

const arrData = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F];

describe('buffer-utils', () => {
  it('can convert Buffer to Buffer', (done) => {
    const input = Buffer.from(arrData)
    const actual = toBuffer(input);

    const actualArr = Array.prototype.slice.call(actual, 0);

    (actual.length).should.be.eql(arrData.length);
    (actualArr).should.be.eql(arrData);

    done();
  });
});
