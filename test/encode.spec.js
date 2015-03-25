'use strict';

var path = require('path');
var should = require('should');
var fs = require('fs');
var lib = require('../index');

describe('Encode', function() {

  var outDir = path.join(__dirname, './out');
  if(!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

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

      var file = 'encoded-1.jpg';
      fs.writeFileSync(path.join(__dirname, './out/' + file), new Buffer(encoded.data));

      done();
    });

  });

  it('can be used to create a JPEG image (ArrayBuffer)', function(done) {
    var width = 320;
    var height = 180;
    var frameData = new ArrayBuffer(width * height * 4);
    var view = new Uint8Array(frameData);
    var i = 0;

    while (i < frameData.length) {
      view[i++] = 0xFF; // red
      view[i++] = 0x00; // green
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

      var file = 'encoded-2.jpg';
      fs.writeFileSync(path.join(__dirname, './out/' + file), new Buffer(encoded.data));

      done();
    });

  });

});
