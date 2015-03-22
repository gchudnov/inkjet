'use strict';

var exifLib = require('./lib/exif');
var decodeLib = require('./lib/decode');
var encodeLib = require('./lib/encode');


module.exports.decode = decodeLib.decode;
module.exports.encode = encodeLib.encode;
module.exports.exif = exifLib.exif;
