'use strict';

var should = require('should');
var lib = require('../index');
var images = require('./images');

describe('Info', function() {

  it('can be fetched for a JPEG file', function(done) {
    var buf = images.buf420;
    lib.info(buf, function(err, data) {
      should.not.exist(err);
      should.exist(data);

      data.should.have.a.property('type').equal('image');
      data.should.have.a.property('mimeType').equal('image/jpeg');
      data.should.have.a.property('extension').equal('jpg');
      data.should.have.a.property('width').equal(1052);
      data.should.have.a.property('height').equal(1052);

      done();
    });
  });

  it('can be fetched for a PNG file', function(done) {
    var buf = images.bufPng;
    lib.info(buf, function(err, data) {
      should.not.exist(err);
      should.exist(data);

      data.should.have.a.property('type').equal('image');
      data.should.have.a.property('mimeType').equal('image/png');
      data.should.have.a.property('extension').equal('png');
      data.should.have.a.property('width').equal(1052);
      data.should.have.a.property('height').equal(1052);

      done();
    });
  });

  it('cannot be fetched for a broken JPEG file', function(done) {
    var buf = images.bufBroken;
    lib.info(buf, function(err, data) {
      should.exist(err);
      should.not.exist(data);
      err.should.be.an.instanceOf(Error);
      done();
    });
  });

});