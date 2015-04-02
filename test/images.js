'use strict';

var fs = require('fs');
var path = require('path');

var file420 = 'js_logo-4-2-0.jpg';
var file422h = 'js_logo-4-2-2-horz.jpg';
var file422v = 'js_logo-4-2-2-vert.jpg';
var file444 = 'js_logo-4-4-4.jpg';
var fileExif = 'js_logo-exif.jpg';

module.exports.name420 = file420;
module.exports.name422h = file422h;
module.exports.name422v = file422v;
module.exports.name444 = file444;
module.exports.nameExif = fileExif;

module.exports.buf420 = fs.readFileSync(path.join(__dirname, '../images/', 'js_logo-4-2-0.jpg'));
module.exports.buf422h = fs.readFileSync(path.join(__dirname, '../images/', 'js_logo-4-2-2-horz.jpg'));
module.exports.buf422v = fs.readFileSync(path.join(__dirname, '../images/', 'js_logo-4-2-2-vert.jpg'));
module.exports.buf444 = fs.readFileSync(path.join(__dirname, '../images/', 'js_logo-4-4-4.jpg'));
module.exports.bufExif = fs.readFileSync(path.join(__dirname, '../images/', 'js_logo-exif.jpg'));
