'use strict';

var should = require('should');
var lib = require('../index');
var constants = require('./constants');

describe('Magic number', function() {

  it('can be detected for a JPEG Buffer', function(done) {
    var buf = new Buffer([0xFF, 0xD8, 0xFF]);

    lib.magic(buf, function(err, result) {
      should.not.exist(err);
      should.exist(result);

      result.mimeType.should.be.equal('image/jpeg');
      result.extension.should.be.equal('jpg');

      done();
    });
  });

  it('can be detected for a JPEG ArrayBuffer', function(done) {
    var buf = new ArrayBuffer(3);
    var view   = new Uint8Array(buf);
    view[0] = 0xFF;
    view[1] = 0xD8;
    view[2] = 0xFF;

    lib.magic(buf, function(err, result) {
      should.not.exist(err);
      should.exist(result);

      result.mimeType.should.be.equal('image/jpeg');
      result.extension.should.be.equal('jpg');

      done();
    });
  });

  it('can be detected for a JPEG Uint8Array', function(done) {
    var buf = new ArrayBuffer(3);
    var view   = new Uint8Array(buf);
    view[0] = 0xFF;
    view[1] = 0xD8;
    view[2] = 0xFF;

    lib.magic(view, function(err, result) {
      should.not.exist(err);
      should.exist(result);

      result.mimeType.should.be.equal('image/jpeg');
      result.extension.should.be.equal('jpg');

      done();
    });
  });

  it('can be detected for a JPEG file', function(done) {
    var buf = constants.buf420;

    lib.magic(buf, function(err, result) {
      should.not.exist(err);
      should.exist(result);

      result.mimeType.should.be.equal('image/jpeg');
      result.extension.should.be.equal('jpg');

      done();
    });
  });

  it('can be detected for a PNG file', function(done) {
    var buf = constants.bufPng;

    lib.magic(buf, function(err, result) {
      should.not.exist(err);
      should.exist(result);

      result.mimeType.should.be.equal('image/png');
      result.extension.should.be.equal('png');

      done();
    });
  });

  it('cannot be detected for a broken JPEG file', function(done) {
    var buf = constants.bufBroken;

    lib.magic(buf, function(err, result) {
      should.exist(err);
      should.not.exist(result);
      err.should.be.an.instanceOf(Error);
      done();
    });
  });

});
