'use strict';

var should = require('should');
var lib = require('../index');
var constants = require('./constants');

describe('Decode', function() {
  this.timeout(60000);

  it('can be used to process ' + constants.name420, function(done) {
    var jpegData = constants.buf420;
    lib.decode(jpegData, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);

      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    });
  });

  it('can be used to process ' + constants.name422h, function(done) {
    var jpegData = constants.buf422h;
    lib.decode(jpegData, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    });
  });

  it('can be used to process ' + constants.name422v, function(done) {
    var jpegData = constants.buf422v;
    lib.decode(jpegData, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    })
  });

  it('can be used to process ' + constants.name444, function(done) {
    var jpegData = constants.buf444;
    lib.decode(jpegData, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    });
  });

  it('can be used to process ' + constants.nameExif, function(done) {
    var jpegData = constants.bufExif;
    lib.decode(jpegData, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
      (decoded.data).should.be.instanceOf(Uint8Array);
      done();
    });
  });

  it('fails to decode a broken JPEG image', function(done) {
    var jpegData = constants.bufBroken;
    lib.decode(jpegData, function(err, decoded) {
      should.exist(err);
      should.not.exist(decoded);
      err.should.be.an.instanceOf(Error);
      done();
    });
  });

});
