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

const pathPng = path.join(__dirname, '../../images/', namePng);
const path420 = path.join(__dirname, '../../images/', name420);
const path422h = path.join(__dirname, '../../images/', name422h);
const path422v = path.join(__dirname, '../../images/', name422v);
const path444 = path.join(__dirname, '../../images/', name444);
const pathAC = path.join(__dirname, '../../images/', nameAC);
const pathP = path.join(__dirname, '../../images/', nameP);
const pathDCTF = path.join(__dirname, '../../images/', nameDCTF);
const pathCP = path.join(__dirname, '../../images/', nameCP);
const pathExif = path.join(__dirname, '../../images/', nameExif);
const pathBroken = path.join(__dirname, '../../images/', nameBroken);

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

  pathPng: pathPng,
  path420: path420,
  path422h: path422h,
  path422v: path422v,
  path444: path444,
  pathAC: pathAC,
  pathP: pathP,
  pathDCTF: pathDCTF,
  pathCP: pathCP,
  pathExif: pathExif,
  pathBroken: pathBroken,

  bufPng: fs.readFileSync(pathPng),
  buf420: fs.readFileSync(path420),
  buf422h: fs.readFileSync(path422h),
  buf422v: fs.readFileSync(path422v),
  buf444: fs.readFileSync(path444),
  bufAC: fs.readFileSync(pathAC),
  bufP: fs.readFileSync(pathP),
  bufDCTF: fs.readFileSync(pathDCTF),
  bufCP: fs.readFileSync(pathCP),
  bufExif: fs.readFileSync(pathExif),
  bufBroken: fs.readFileSync(pathBroken),
}
