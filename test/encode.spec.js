'use strict';

var path = require('path');
var should = require('should');
var lib = require('../index');
var writer = require('./util/file-writer');

describe('Encode', function() {
  this.timeout(60000);

  it('can be used to create a JPEG image (Buffer)', function(done) {
    var width = 320;
    var height = 180;
    var frameData = new Buffer(width * height * 4);
    var i = 0;

    while (i < frameData.length) {
      frameData[i++] = 0xFF; // red
      frameData[i++] = 0x00; // green
      frameData[i++] = 0x00; // blue
      frameData[i++] = 0xFF; // alpha - ignored in JPEGs
    }

    var buf = frameData;
    var options = {
      width: width,
      height: height,
      quality: 80
    };

    lib.encode(buf, options, function(err, encoded) {
      should.not.exist(err);
      should.exist(encoded);
      (encoded.width).should.be.eql(320);
      (encoded.height).should.be.eql(180);
      (encoded.data).should.be.instanceOf(Uint8Array);

      if('writeFileSync' in writer) {
        writer.writeFileSync(path.join(__dirname, './out/' + 'encoded-red.jpg'), encoded.data);
      }

      done();
    });

  });

  it('can be used to create a JPEG image (ArrayBuffer)', function(done) {
    var width = 320;
    var height = 180;
    var frameData = new ArrayBuffer(width * height * 4);
    var view = new Uint8Array(frameData);
    var i = 0;

    while (i < view.length) {
      view[i++] = 0x00; // red
      view[i++] = 0xFF; // green
      view[i++] = 0x00; // blue
      view[i++] = 0xFF; // alpha - ignored in JPEGs
    }

    var buf = frameData;
    var options = {
      width: width,
      height: height,
      quality: 80
    };

    lib.encode(buf, options, function(err, encoded) {
      should.not.exist(err);
      should.exist(encoded);
      (encoded.width).should.be.eql(320);
      (encoded.height).should.be.eql(180);
      (encoded.data).should.be.instanceOf(Uint8Array);

      if('writeFileSync' in writer) {
        writer.writeFileSync(path.join(__dirname, './out/' + 'encoded-green.jpg'), encoded.data);
      }

      done();
    });

  });

  it('can be used to create a JPEG image (Uint8Array)', function(done) {
    var width = 320;
    var height = 180;
    var frameData = new Uint8Array(width * height * 4);
    var i = 0;

    while (i < frameData.length) {
      frameData[i++] = 0x00; // red
      frameData[i++] = 0x00; // green
      frameData[i++] = 0xFF; // blue
      frameData[i++] = 0xFF; // alpha - ignored in JPEGs
    }

    var buf = frameData;
    var options = {
      width: width,
      height: height,
      quality: 80
    };

    lib.encode(buf, options, function(err, encoded) {
      should.not.exist(err);
      should.exist(encoded);
      (encoded.width).should.be.eql(320);
      (encoded.height).should.be.eql(180);
      (encoded.data).should.be.instanceOf(Uint8Array);

      if('writeFileSync' in writer) {
        writer.writeFileSync(path.join(__dirname, './out/' + 'encoded-blue.jpg'), encoded.data);
      }

      done();
    });

  });

});
