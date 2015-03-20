'use strict';

var path = require('path');
var should = require('should');
var fs = require('fs');
var bu = require('../lib/buffer-utils');
var lib = require('../index');

describe('Exif', function() {

  var file1 = 'jpeg400jfif.jpg';
  var file2 = 'jpeg420exif.jpg';
  var file3 = 'jpeg422jfif.jpg';
  var file4 = 'jpeg444.jpg';
  var file5 = 'jpeg-progressive.jpg';

  it('should NOT be detected for ' + file1, function(done) {
    var filepath = path.join(__dirname, '../images/', file1);
    var jpegData = fs.readFileSync(filepath);
    var jpegArrBuf = bu.toArrayBuffer(jpegData);
    lib.readExif(jpegArrBuf, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      done();
    })
  });

  it('should be detected for ' + file2, function(done) {
    var filepath = path.join(__dirname, '../images/', file2);
    var jpegData = fs.readFileSync(filepath);
    var jpegArrBuf = bu.toArrayBuffer(jpegData);
    lib.readExif(jpegArrBuf, function(err, data) {
      should.not.exist(err);
      should.exist(data);
      done();
    })
  });

  it('should NOT be detected for ' + file3, function(done) {
    var filepath = path.join(__dirname, '../images/', file3);
    var jpegData = fs.readFileSync(filepath);
    var jpegArrBuf = bu.toArrayBuffer(jpegData);
    lib.readExif(jpegArrBuf, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      done();
    })
  });

  it('should NOT be detected for ' + file4, function(done) {
    var filepath = path.join(__dirname, '../images/', file4);
    var jpegData = fs.readFileSync(filepath);
    var jpegArrBuf = bu.toArrayBuffer(jpegData);
    lib.readExif(jpegArrBuf, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      done();
    })
  });

  it('should NOT be detected for ' + file5, function(done) {
    var filepath = path.join(__dirname, '../images/', file5);
    var jpegData = fs.readFileSync(filepath);
    var jpegArrBuf = bu.toArrayBuffer(jpegData);
    lib.readExif(jpegArrBuf, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      done();
    })
  });

});