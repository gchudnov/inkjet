import fs from 'fs';
import path from 'path';

const namePng = 'js_logo.png';
const name420 = 'js_logo-4-2-0.jpg';
const name422h = 'js_logo-4-2-2-horz.jpg';
const name422v = 'js_logo-4-2-2-vert.jpg';
const name444 = 'js_logo-4-4-4.jpg';
const nameExif = 'js_logo-exif.jpg';
const nameBroken = 'js_broken.jpg';

export default {
  namePng: namePng,
  name420: name420,
  name422h: name422h,
  name422v: name422v,
  name444: name444,
  nameExif: nameExif,
  nameBroken: nameBroken,

  bufPng: fs.readFileSync(path.join(__dirname, '../../images/', 'js_logo.png')),
  buf420: fs.readFileSync(path.join(__dirname, '../../images/', 'js_logo-4-2-0.jpg')),
  buf422h: fs.readFileSync(path.join(__dirname, '../../images/', 'js_logo-4-2-2-horz.jpg')),
  buf422v: fs.readFileSync(path.join(__dirname, '../../images/', 'js_logo-4-2-2-vert.jpg')),
  buf444: fs.readFileSync(path.join(__dirname, '../../images/', 'js_logo-4-4-4.jpg')),
  bufExif: fs.readFileSync(path.join(__dirname, '../../images/', 'js_logo-exif.jpg')),
  bufBroken: fs.readFileSync(path.join(__dirname, '../../images/', 'js_broken.jpg')),
}
