'use strict';

var path = require('path');
var should = require('should');
var fs = require('fs');
var bu = require('../lib/buffer-utils');
var lib = require('../index');

describe('EXIF', function() {

  var file1 = path.join(__dirname, '..', './images/jpeg400jfif.jpg');
  it('should not be detected for ' + file1, function(done) {
    var jpegData = fs.readFileSync(file1);
    var jpegArrBuf = bu.toArrayBuffer(jpegData);
    lib.readExif(jpegArrBuf, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      done();
    })
  });

  var file2 = path.join(__dirname, '..', './images/jpeg420exif.jpg');
  it('should be detected for ' + file2, function(done) {
    var jpegData = fs.readFileSync(file2);
    var jpegArrBuf = bu.toArrayBuffer(jpegData);
    lib.readExif(jpegArrBuf, function(err, data) {
      should.not.exist(err);
      should.exist(data);
      done();
    })
  });

  var file3 = path.join(__dirname, '..', './images/jpeg422jfif.jpg');
  it('should not be detected for ' + file3, function(done) {
    var jpegData = fs.readFileSync(file3);
    var jpegArrBuf = bu.toArrayBuffer(jpegData);
    lib.readExif(jpegArrBuf, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      done();
    })
  });

  var file4 = path.join(__dirname, '..', './images/jpeg444.jpg');
  it('should not be detected for ' + file4, function(done) {
    var jpegData = fs.readFileSync(file4);
    var jpegArrBuf = bu.toArrayBuffer(jpegData);
    lib.readExif(jpegArrBuf, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      done();
    })
  });

  var file5 = path.join(__dirname, '..', './images/jpeg-progressive.jpg');
  it('should not be detected for ' + file5, function(done) {
    var jpegData = fs.readFileSync(file5);
    var jpegArrBuf = bu.toArrayBuffer(jpegData);
    lib.readExif(jpegArrBuf, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      done();
    })
  });

});