'use strict';

var should = require('should');
var lib = require('../index');
var images = require('./images');

describe('Exif', function() {
  this.timeout(60000);

  it('should be detected for ' + images.nameExif, function(done) {
    var jpegData = images.bufExif;
    lib.exif(jpegData, function(err, data) {
      should.not.exist(err);
      should.exist(data);
      done();
    });
  });

  it('should be detected for ' + images.nameExif + ' (first 128Kb taken)', function(done) {
    var jpegData = images.bufExif;
    jpegData = jpegData.slice(0, 128 * 1024);
    lib.exif(jpegData, function(err, data) {
      should.not.exist(err);
      should.exist(data);
      done();
    });
  });

  it('should NOT be detected for ' + images.name420, function(done) {
    var jpegData = images.buf420;
    lib.exif(jpegData, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      done();
    });
  });

});