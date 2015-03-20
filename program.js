'use strict';

var fs = require('fs');
var path = require('path');
var lib = require('./index');
var bu = require('./lib/buffer-utils');

// source
var imagePath = path.join(__dirname, './images/jpeg420exif.jpg');
console.log(imagePath);

// data
var jpegData = fs.readFileSync(imagePath);
var jpegArrBuf = bu.toArrayBuffer(jpegData);

// decode
lib.decode(jpegArrBuf, function(err, data) {
  console.log(err);
  console.log(data);
});




//// data
//var jpegData = fs.readFileSync(imagePath);
//var jpegArrBuf = bu.toArrayBuffer(jpegData);
//
//lib.readExif(jpegArrBuf, function(err, data) {
//  console.log(err);
//  console.log(data);
//});
