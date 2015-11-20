'use strict';

var should = require('should');
var lib = require('../index');
var images = require('./images');

describe('Decode', function() {
  this.timeout(60000);

  it('can be used to process ' + images.name420, function(done) {
    var jpegData = images.buf420;
    lib.decode(jpegData, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);

      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    });
  });

  it('can be used to process ' + images.name422h, function(done) {
    var jpegData = images.buf422h;
    lib.decode(jpegData, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    });
  });

  it('can be used to process ' + images.name422v, function(done) {
    var jpegData = images.buf422v;
    lib.decode(jpegData, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    })
  });

  it('can be used to process ' + images.name444, function(done) {
    var jpegData = images.buf444;
    lib.decode(jpegData, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    });
  });

  it('can be used to process ' + images.nameExif, function(done) {
    var jpegData = images.bufExif;
    lib.decode(jpegData, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    });
  });

});
