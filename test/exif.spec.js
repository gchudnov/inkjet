import should from 'should';
import lib from '../index';
import constants from './constants';

describe('Exif', () => {

  it('should be detected for ' + constants.nameExif, (done) => {
    const jpegData = constants.bufExif;
    lib.exif(jpegData, (err, data) => {
      should.not.exist(err);
      should.exist(data);
      data.should.have.properties('ImageDescription');
      done();
    });
  });

  it('should be detected for ' + constants.nameExif + ' (take 128Kb)', (done) => {
    let jpegData = constants.bufExif;
    jpegData = jpegData.slice(0, 128 * 1024);
    lib.exif(jpegData, (err, data) => {
      should.not.exist(err);
      should.exist(data);
      data.should.have.properties('ImageDescription');
      done();
    });
  });

  it('should NOT be detected for ' + constants.name420, (done) => {
    const jpegData = constants.buf420;
    lib.exif(jpegData, (err, data) => {
      should.not.exist(err);
      should.exist(data);
      done();
    });
  });

  it('should return an error for ' + constants.nameBroken, (done) => {
    const jpegData = constants.bufBroken;
    lib.exif(jpegData, (err, data) => {
      should.exist(err);
      should.not.exist(data);
      done();
    });
  });
}).timeout(60000);
