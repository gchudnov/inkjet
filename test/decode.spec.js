'use strict';

var path = require('path');
var should = require('should');
var fs = require('fs');
var bufferUtils = require('../lib/buffer-utils');
var lib = require('../index');

describe('Decode', function() {

  var file1 = 'jpeg400jfif.jpg';
  var file2 = 'jpeg420exif.jpg';
  var file3 = 'jpeg422jfif.jpg';
  var file4 = 'jpeg444.jpg'; // 444 not supported
  var file5 = 'jpeg-progressive.jpg';


  it('can be used to process ' + file1, function(done) {
    var filepath = path.join(__dirname, '../images/', file1);
    var jpegData = fs.readFileSync(filepath);
    lib.decode(jpegData, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(600);
      (decoded.height).should.be.eql(800);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    })
  });

  it('can be used to process ' + file2, function(done) {
    var filepath = path.join(__dirname, '../images/', file2);
    var jpegData = fs.readFileSync(filepath);
    lib.decode(jpegData, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(2048);
      (decoded.height).should.be.eql(1536);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    })
  });

  it('can be used to process ' + file3, function(done) {
    var filepath = path.join(__dirname, '../images/', file3);
    var jpegData = fs.readFileSync(filepath);
    lib.decode(jpegData, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(2048);
      (decoded.height).should.be.eql(1536);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    })
  });

  it('can NOT be used to process ' + file4, function(done) {
    var filepath = path.join(__dirname, '../images/', file4);
    var jpegData = fs.readFileSync(filepath);
    lib.decode(jpegData, function(err, decoded) {
      should.exist(err);
      should.not.exist(decoded);
      done();
    })
  });

  it('can be used to process ' + file5, function(done) {
    var filepath = path.join(__dirname, '../images/', file5);
    var jpegData = fs.readFileSync(filepath);
    lib.decode(jpegData, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(341);
      (decoded.height).should.be.eql(486);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    })
  });

});