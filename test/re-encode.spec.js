'use strict';

var path = require('path');
var should = require('should');
var fs = require('fs');
var bu = require('../lib/buffer-utils');
var lib = require('../index');

describe('Re-Encode', function() {

  var outDir = path.join(__dirname, './out');
  if(!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  var file1 = 'jpeg400jfif.jpg';
  var file2 = 'jpeg420exif.jpg';
  var file3 = 'jpeg422jfif.jpg';
  //var file4 = 'jpeg444.jpg'; // 444 not supported
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

      var buf = decoded.data;
      var options = {
        width: decoded.width,
        height: decoded.height,
        quality: 80
      };

      lib.encode(buf, options, function(err, encoded) {
        should.not.exist(err);
        should.exist(encoded);
        (encoded.width).should.be.eql(600);
        (encoded.height).should.be.eql(800);
        (encoded.data).should.be.instanceOf(Uint8Array);

        fs.writeFileSync(path.join(__dirname, './out/' + file1), new Buffer(encoded.data));

        done();
      });
    });
  });

  it('can be used to process ' + file2, function(done) {
    var filepath = path.join(__dirname, '../images/', file2);
    var jpegData = fs.readFileSync(filepath);
    lib.decode(jpegData, { width: 512, height: 384 }, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(512);
      (decoded.height).should.be.eql(384);
      (decoded.data).should.be.instanceOf(Uint8Array);

      var buf = decoded.data;
      var options = {
        width: decoded.width,
        height: decoded.height,
        quality: 80
      };

      lib.encode(buf, options, function(err, encoded) {
        should.not.exist(err);
        should.exist(encoded);
        (encoded.width).should.be.eql(512);
        (encoded.height).should.be.eql(384);
        (encoded.data).should.be.instanceOf(Uint8Array);

        fs.writeFileSync(path.join(__dirname, './out/' + file2), new Buffer(encoded.data));

        done();
      });
    });
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

      var buf = decoded.data;
      var options = {
        width: decoded.width,
        height: decoded.height,
        quality: 80
      };

      lib.encode(buf, options, function(err, encoded) {
        should.not.exist(err);
        should.exist(encoded);
        (encoded.width).should.be.eql(2048);
        (encoded.height).should.be.eql(1536);
        (encoded.data).should.be.instanceOf(Uint8Array);

        fs.writeFileSync(path.join(__dirname, './out/' + file3), new Buffer(encoded.data));

        done();
      });
    });
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

      var buf = decoded.data;
      var options = {
        width: decoded.width,
        height: decoded.height,
        quality: 80
      };

      lib.encode(buf, options, function(err, encoded) {
        should.not.exist(err);
        should.exist(encoded);
        (encoded.width).should.be.eql(341);
        (encoded.height).should.be.eql(486);
        (encoded.data).should.be.instanceOf(Uint8Array);

        fs.writeFileSync(path.join(__dirname, './out/' + file5), new Buffer(encoded.data));

        done();
      });
    });
  });

});