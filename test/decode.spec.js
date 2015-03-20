'use strict';

var path = require('path');
var should = require('should');
var fs = require('fs');
var bu = require('../lib/buffer-utils');
var lib = require('../index');

describe('Decode', function() {

  var file1 = 'jpeg400jfif.jpg';
  var file2 = 'jpeg420exif.jpg';
  var file3 = 'jpeg422jfif.jpg';
  var file4 = 'jpeg444.jpg'; // 444 not supported
  var file5 = 'jpeg-progressive.jpg';


  it('can be used to decode ' + file1, function(done) {
    var filepath = path.join(__dirname, '../images/', file1);
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
    var filepath = path.join(__dirname, '../images/', file2);
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
    var filepath = path.join(__dirname, '../images/', file3);
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
    var filepath = path.join(__dirname, '../images/', file4);
    var jpegData = fs.readFileSync(filepath);
    var jpegU8Buf = bu.toUint8ArrayBuffer(jpegData);
    lib.decode(jpegU8Buf, function(err, data) {
      should.exist(err);
      should.not.exist(data);

      done();
    })
  });

  it('can be used to decode ' + file5, function(done) {
    var filepath = path.join(__dirname, '../images/', file5);
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