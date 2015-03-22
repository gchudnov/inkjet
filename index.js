'use strict';

var exif = require('./lib/exif');
var decode = require('./lib/decode');
var encode = require('./lib/encode');


module.exports.decode = decode;
module.exports.encode = encode;
module.exports.exif = exif;
