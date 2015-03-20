'use strict';

var path = require('path');
var should = require('should');
var fs = require('fs');
var bu = require('../lib/buffer-utils');
var lib = require('../index');

describe('Encode', function() {

  var file1 = './images/jpeg400jfif.jpg';
  var file2 = './images/jpeg420exif.jpg';
  var file3 = './images/jpeg422jfif.jpg';
  var file4 = './images/jpeg444.jpg';
  var file5 = './images/jpeg-progressive.jpg';

  it('can be used to re-encode ' + file1, function(done) {
    var filepath = path.join(__dirname, '..', file1);
    var jpegData = fs.readFileSync(filepath);
    var jpegU8Buf = bu.toUint8ArrayBuffer(jpegData);
    lib.decode(jpegU8Buf, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(600);
      (decoded.height).should.be.eql(800);


      lib.encode(decoded, 80, function(err, encoded) {
        should.not.exist(err);
        should.exist(encoded);
        (encoded.width).should.be.eql(600);
        (encoded.height).should.be.eql(800);

        //fs.writeFileSync('output.jpg', encoded.data);

        done();
      });
    });
  });

  it.only('can be used to re-encode ' + file2, function(done) {
    var filepath = path.join(__dirname, '..', file2);
    var jpegData = fs.readFileSync(filepath);
    var jpegU8Buf = bu.toUint8ArrayBuffer(jpegData);
    lib.decode(jpegU8Buf, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(2048);
      (decoded.height).should.be.eql(1536);


      lib.encode(decoded, 80, function(err, encoded) {
        should.not.exist(err);
        should.exist(encoded);
        (encoded.width).should.be.eql(2048);
        (encoded.height).should.be.eql(1536);

        fs.writeFileSync('output.jpg', encoded.data);

        done();
      });
    });
  });

  it('can be used to re-encode ' + file3, function(done) {
    var filepath = path.join(__dirname, '..', file3);
    var jpegData = fs.readFileSync(filepath);
    var jpegU8Buf = bu.toUint8ArrayBuffer(jpegData);
    lib.decode(jpegU8Buf, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(2048);
      (decoded.height).should.be.eql(1536);


      lib.encode(decoded, 80, function(err, encoded) {
        should.not.exist(err);
        should.exist(encoded);
        (encoded.width).should.be.eql(2048);
        (encoded.height).should.be.eql(1536);

        //fs.writeFileSync('output.jpg', encoded.data);

        done();
      });
    });
  });

  //it('can be used to re-encode ' + file4, function(done) {
  //  var filepath = path.join(__dirname, '..', file4);
  //  var jpegData = fs.readFileSync(filepath);
  //  var jpegU8Buf = bu.toUint8ArrayBuffer(jpegData);
  //  lib.decode(jpegU8Buf, function(err, decoded) {
  //    should.not.exist(err);
  //    should.exist(decoded);
  //    (decoded.width).should.be.eql(600);
  //    (decoded.height).should.be.eql(800);
  //
  //
  //    lib.encode(decoded, 80, function(err, encoded) {
  //      should.not.exist(err);
  //      should.exist(encoded);
  //      (encoded.width).should.be.eql(600);
  //      (encoded.height).should.be.eql(800);
  //
  //      //fs.writeFileSync('output.jpg', encoded.data);
  //
  //      done();
  //    });
  //  });
  //});

  it('can be used to re-encode ' + file5, function(done) {
    var filepath = path.join(__dirname, '..', file5);
    var jpegData = fs.readFileSync(filepath);
    var jpegU8Buf = bu.toUint8ArrayBuffer(jpegData);
    lib.decode(jpegU8Buf, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(600);
      (decoded.height).should.be.eql(800);


      lib.encode(decoded, 80, function(err, encoded) {
        should.not.exist(err);
        should.exist(encoded);
        (encoded.width).should.be.eql(600);
        (encoded.height).should.be.eql(800);

        //fs.writeFileSync('output.jpg', encoded.data);

        done();
      });
    });
  });

});
