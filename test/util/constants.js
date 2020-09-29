import fs from 'fs';
import path from 'path';

const namePng = 'js_logo.png';
const name420 = 'js_logo-4-2-0.jpg';
const name422h = 'js_logo-4-2-2-horz.jpg';
const name422v = 'js_logo-4-2-2-vert.jpg';
const name444 = 'js_logo-4-4-4.jpg';
const nameAC = 'js_logo-arithmetic-coding.jpg';
const nameP = 'js_logo-progressive.jpg';
const nameDCTF = 'js_logo-dct-float.jpg';
const nameCP = 'js_logo-sRGB-IEC61966-2-1.jpg';
const nameExif = 'js_logo-exif.jpg';
const nameBroken = 'js_broken.jpg';

export default {
  namePng: namePng,
  name420: name420,
  name422h: name422h,
  name422v: name422v,
  name444: name444,
  nameAC: nameAC,
  nameP: nameP,
  nameDCTF: nameDCTF,
  nameCP: nameCP,
  nameExif: nameExif,
  nameBroken: nameBroken,

  bufPng: fs.readFileSync(path.join(__dirname, '../../images/', namePng)),
  buf420: fs.readFileSync(path.join(__dirname, '../../images/', name420)),
  buf422h: fs.readFileSync(path.join(__dirname, '../../images/', name422h)),
  buf422v: fs.readFileSync(path.join(__dirname, '../../images/', name422v)),
  buf444: fs.readFileSync(path.join(__dirname, '../../images/', name444)),
  bufAC: fs.readFileSync(path.join(__dirname, '../../images/', nameAC)),
  bufP: fs.readFileSync(path.join(__dirname, '../../images/', nameP)),
  bufDCTF: fs.readFileSync(path.join(__dirname, '../../images/', nameDCTF)),
  bufCP: fs.readFileSync(path.join(__dirname, '../../images/', nameCP)),
  bufExif: fs.readFileSync(path.join(__dirname, '../../images/', nameExif)),
  bufBroken: fs.readFileSync(path.join(__dirname, '../../images/', nameBroken)),
}
