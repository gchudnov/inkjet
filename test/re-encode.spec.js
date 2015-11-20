'use strict';

var path = require('path');
var should = require('should');
var lib = require('../index');
var constants = require('./constants');
var writer = require('./util/file-writer');


describe('Re-Encode', function() {
  this.timeout(60000);

  it('can be used to process ' + constants.name420, function(done) {
    var jpegData = constants.buf420;
    lib.decode(jpegData, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
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
        (encoded.width).should.be.eql(1052);
        (encoded.height).should.be.eql(1052);
        (encoded.data).should.be.instanceOf(Uint8Array);

        if('writeFileSync' in writer) {
          writer.writeFileSync(path.join(__dirname, './out/' + constants.name420), encoded.data);
        }

        done();
      });
    });
  });

  it('can be used to process ' + constants.name422h, function(done) {
    var jpegData = constants.buf422h;
    lib.decode(jpegData, { width: 1052, height: 1052 }, function(err, decoded) {
      should.not.exist(err);
      should.exist(decoded);
      (decoded.width).should.be.eql(1052);
      (decoded.height).should.be.eql(1052);
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
        (encoded.width).should.be.eql(1052);
        (encoded.height).should.be.eql(1052);
        (encoded.data).should.be.instanceOf(Uint8Array);

        if('writeFileSync' in writer) {
          writer.writeFileSync(path.join(__dirname, './out/' + constants.name422h), encoded.data);
        }

        done();
      });
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

      var buf = decoded.data;
      var options = {
        width: decoded.width,
        height: decoded.height,
        quality: 80
      };

      lib.encode(buf, options, function(err, encoded) {
        should.not.exist(err);
        should.exist(encoded);
        (encoded.width).should.be.eql(1052);
        (encoded.height).should.be.eql(1052);
        (encoded.data).should.be.instanceOf(Uint8Array);

        if('writeFileSync' in writer) {
          writer.writeFileSync(path.join(__dirname, './out/' + constants.name422v), encoded.data);
        }

        done();
      });
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

      var buf = decoded.data;
      var options = {
        width: decoded.width,
        height: decoded.height,
        quality: 80
      };

      lib.encode(buf, options, function(err, encoded) {
        should.not.exist(err);
        should.exist(encoded);
        (encoded.width).should.be.eql(1052);
        (encoded.height).should.be.eql(1052);
        (encoded.data).should.be.instanceOf(Uint8Array);

        if('writeFileSync' in writer) {
          writer.writeFileSync(path.join(__dirname, './out/' + constants.nameExif), encoded.data);
        }

        done();
      });
    });
  });

});
