'use strict';

var should = require('should');
var lib = require('../index');
var constants = require('./constants');

describe('Exif', function() {
  this.timeout(60000);

  it('should be detected for ' + constants.nameExif, function(done) {
    var jpegData = constants.bufExif;
    lib.exif(jpegData, function(err, data) {
      should.not.exist(err);
      should.exist(data);
      done();
    });
  });

  it('should be detected for ' + constants.nameExif + ' (first 128Kb taken)', function(done) {
    var jpegData = constants.bufExif;
    jpegData = jpegData.slice(0, 128 * 1024);
    lib.exif(jpegData, function(err, data) {
      should.not.exist(err);
      should.exist(data);
      done();
    });
  });

  it('should NOT be detected for ' + constants.name420, function(done) {
    var jpegData = constants.buf420;
    lib.exif(jpegData, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      done();
    });
  });

  it('should NOT be detected for ' + constants.nameBroken, function(done) {
    var jpegData = constants.bufBroken;
    lib.exif(jpegData, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      done();
    });
  });
});