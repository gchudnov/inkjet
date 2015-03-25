'use strict';

var path = require('path');
var should = require('should');
var fs = require('fs');
var lib = require('../index');
var bufferUtils = require('../lib/buffer-utils');

describe('Exif', function() {

  var file1 = 'jpeg400jfif.jpg';
  var file2 = 'jpeg420exif.jpg';
  var file3 = 'jpeg422jfif.jpg';
  var file4 = 'jpeg444.jpg';
  var file5 = 'jpeg-progressive.jpg';

  it('should NOT be detected for ' + file1, function(done) {
    var filepath = path.join(__dirname, '../images/', file1);
    var jpegData = fs.readFileSync(filepath);
    lib.exif(jpegData, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      done();
    })
  });

  it('should be detected for ' + file2, function(done) {
    var filepath = path.join(__dirname, '../images/', file2);
    var jpegData = fs.readFileSync(filepath);
    lib.exif(jpegData, function(err, data) {
      should.not.exist(err);
      should.exist(data);
      done();
    })
  });

  it('should be detected for ' + file2 + ' (first 128Kb taken)', function(done) {
    var filepath = path.join(__dirname, '../images/', file2);
    var jpegData = fs.readFileSync(filepath);
    jpegData = jpegData.slice(0, 128 * 1024);
    lib.exif(jpegData, function(err, data) {
      should.not.exist(err);
      should.exist(data);
      done();
    })
  });

  it('should be detected for ' + file2 + ' (Buffer)', function(done) {
    var filepath = path.join(__dirname, '../images/', file2);
    var jpegBuffer = fs.readFileSync(filepath);
    jpegBuffer.should.be.an.instanceOf(Buffer);
    lib.exif(jpegBuffer, function(err, data) {
      should.not.exist(err);
      should.exist(data);
      done();
    })
  });

  it('should be detected for ' + file2 + ' (ArrayBuffer)', function(done) {
    var filepath = path.join(__dirname, '../images/', file2);
    var jpegBuffer = bufferUtils.bufferToArrayBuffer(fs.readFileSync(filepath));
    jpegBuffer.should.be.an.instanceOf(ArrayBuffer);
    lib.exif(jpegBuffer, function(err, data) {
      should.not.exist(err);
      should.exist(data);
      done();
    })
  });

  it('should NOT be detected for ' + file3, function(done) {
    var filepath = path.join(__dirname, '../images/', file3);
    var jpegData = fs.readFileSync(filepath);
    lib.exif(jpegData, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      done();
    })
  });

  it('should NOT be detected for ' + file4, function(done) {
    var filepath = path.join(__dirname, '../images/', file4);
    var jpegData = fs.readFileSync(filepath);
    lib.exif(jpegData, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      done();
    })
  });

  it('should NOT be detected for ' + file5, function(done) {
    var filepath = path.join(__dirname, '../images/', file5);
    var jpegData = fs.readFileSync(filepath);
    lib.exif(jpegData, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      done();
    })
  });

});