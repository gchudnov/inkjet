import { toBuffer, toArrayBuffer } from '../src/lib/buffer-utils';

const arrData = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F];

function copyData(from, to) {
  let i = 0;
  while (i < from.length) {
    to[i] = from[i];
    i++
  }
}

describe('buffer-utils', () => {

  it('can convert Buffer to Buffer', (done) => {
    const input = Buffer.from(arrData)

    const actual = toBuffer(input);
    const actualArr = Array.prototype.slice.call(actual, 0);

    (actual.length).should.be.eql(arrData.length);
    (actualArr).should.be.eql(arrData);

    done();
  });

  it('can convert Uint8Array to Buffer', (done) => {
    const input = new Uint8Array(arrData)

    const actual = toBuffer(input);
    const actualArr = Array.prototype.slice.call(actual, 0);

    (actual.length).should.be.eql(arrData.length);
    (actualArr).should.be.eql(arrData);

    done();
  });

  it('can convert Uint8ClampedArray to Buffer', (done) => {
    const input = new Uint8ClampedArray(arrData)

    const actual = toBuffer(input);
    const actualArr = Array.prototype.slice.call(actual, 0);

    (actual.length).should.be.eql(arrData.length);
    (actualArr).should.be.eql(arrData);

    done();
  });

  it('can convert ArrayBuffer to Buffer', (done) => {
    const buffer = new ArrayBuffer(arrData.length);
    const view = new Uint8Array(buffer);
    copyData(arrData, view)

    const actual = toBuffer(buffer);

    const actualArr = Array.prototype.slice.call(actual, 0);

    (actual.length).should.be.eql(arrData.length);
    (actualArr).should.be.eql(arrData);

    done();
  });

  it('can convert ArrayBuffer to ArrayBuffer', (done) => {
    const buffer = new ArrayBuffer(arrData.length);
    const view = new Uint8Array(buffer);
    copyData(arrData, view)

    const actual = toArrayBuffer(buffer);
    const actualView = new Uint8Array(actual);
    const actualArr = Array.prototype.slice.call(actualView, 0);

    (actual.byteLength).should.be.eql(arrData.length);
    (actualArr).should.be.eql(arrData);

    done();
  });

});
