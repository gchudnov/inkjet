'use strict';

var fs = require('fs');
var path = require('path');

var namePng = 'js_logo.png';
var name420 = 'js_logo-4-2-0.jpg';
var name422h = 'js_logo-4-2-2-horz.jpg';
var name422v = 'js_logo-4-2-2-vert.jpg';
var name444 = 'js_logo-4-4-4.jpg';
var nameExif = 'js_logo-exif.jpg';
var nameBroken = 'js_broken.jpg';

module.exports.namePng = namePng;
module.exports.name420 = name420;
module.exports.name422h = name422h;
module.exports.name422v = name422v;
module.exports.name444 = name444;
module.exports.nameExif = nameExif;
module.exports.nameBroken = nameBroken;

module.exports.bufPng = fs.readFileSync(path.join(__dirname, '../images/', 'js_logo.png'));
module.exports.buf420 = fs.readFileSync(path.join(__dirname, '../images/', 'js_logo-4-2-0.jpg'));
module.exports.buf422h = fs.readFileSync(path.join(__dirname, '../images/', 'js_logo-4-2-2-horz.jpg'));
module.exports.buf422v = fs.readFileSync(path.join(__dirname, '../images/', 'js_logo-4-2-2-vert.jpg'));
module.exports.buf444 = fs.readFileSync(path.join(__dirname, '../images/', 'js_logo-4-4-4.jpg'));
module.exports.bufExif = fs.readFileSync(path.join(__dirname, '../images/', 'js_logo-exif.jpg'));
module.exports.bufBroken = fs.readFileSync(path.join(__dirname, '../images/', 'js_broken.jpg'));
