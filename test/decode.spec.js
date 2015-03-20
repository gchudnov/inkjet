'use strict';

var path = require('path');
var should = require('should');
var fs = require('fs');
var bu = require('../lib/buffer-utils');
var lib = require('../index');

describe('Decode', function() {

  var file1 = './images/jpeg400jfif.jpg';
  var file2 = './images/jpeg420exif.jpg';
  var file3 = './images/jpeg422jfif.jpg';
  var file4 = './images/jpeg444.jpg';
  var file5 = './images/jpeg-progressive.jpg';


  it('can be used to decode ' + file1, function(done) {
    var filepath = path.join(__dirname, '..', file1);
    var jpegData = fs.readFileSync(filepath);
    var jpegU8Buf = bu.toUint8ArrayBuffer(jpegData);
    lib.decode(jpegU8Buf, function(err, data) {
      should.not.exist(err);
      should.exist(data);
      (data.width).should.be.eql(600);
      (data.height).should.be.eql(800);
      done();
    })
  });

  it('can be used to decode ' + file2, function(done) {
    var filepath = path.join(__dirname, '..', file2);
    var jpegData = fs.readFileSync(filepath);
    var jpegU8Buf = bu.toUint8ArrayBuffer(jpegData);
    lib.decode(jpegU8Buf, function(err, data) {
      should.not.exist(err);
      should.exist(data);
      (data.width).should.be.eql(2048);
      (data.height).should.be.eql(1536);
      done();
    })
  });

  it('can be used to decode ' + file3, function(done) {
    var filepath = path.join(__dirname, '..', file3);
    var jpegData = fs.readFileSync(filepath);
    var jpegU8Buf = bu.toUint8ArrayBuffer(jpegData);
    lib.decode(jpegU8Buf, function(err, data) {
      should.not.exist(err);
      should.exist(data);
      (data.width).should.be.eql(2048);
      (data.height).should.be.eql(1536);
      done();
    })
  });

  it('can NOT be used to decode ' + file4, function(done) {
    var filepath = path.join(__dirname, '..', file4);
    var jpegData = fs.readFileSync(filepath);
    var jpegU8Buf = bu.toUint8ArrayBuffer(jpegData);
    lib.decode(jpegU8Buf, function(err, data) {
      should.exist(err);
      should.not.exist(data);

      done();
    })
  });

  it('can be used to decode ' + file5, function(done) {
    var filepath = path.join(__dirname, '..', file5);
    var jpegData = fs.readFileSync(filepath);
    var jpegU8Buf = bu.toUint8ArrayBuffer(jpegData);
    lib.decode(jpegU8Buf, function(err, data) {
      should.not.exist(err);
      should.exist(data);
      (data.width).should.be.eql(341);
      (data.height).should.be.eql(486);
      done();
    })
  });

});