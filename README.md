# inkjet
JPEG-Image decoding, encoding & EXIF reading library.

## Installation

installing with npm:
```bash
$ npm install inkjet --save
```

## In browser

To use _inkjet_ in a browser, use the `inkjet.js` file in the `/dist` directory of this repository, or build it manually. To build a fresh version:

```bash
$ npm install
$ npm run browser
```

installing with bower:
```bash
$ bower install inkjet
```

## Usage

### Decode JPEG
```javascript
var inkjet = require('inkjet');

var filepath = './images/jpeg420exif.jpg';
var buf = fs.readFileSync(filepath);

inkjet.decode(buf, function(err, decoded) {
  // decoded: { width: number, height: number, data: Uint8Array }
});
```

### Encode JPEG
```javascript
var inkjet = require('inkjet');

var width = 320;
var height = 180;
var frameData = new Buffer(width * height * 4);
var i = 0;

while (i < frameData.length) {
  frameData[i++] = 0xFF; // red
  frameData[i++] = 0x00; // green
  frameData[i++] = 0x00; // blue
  frameData[i++] = 0xFF; // alpha - ignored in JPEGs
}

var buf = frameData;
var options = {
  width: width,
  height: height,
  quality: 80
};

inkjet.encode(buf, options, function(err, encoded) {
  // encoded: { width: number, height: number, data: Uint8Array }
});
```

### Read EXIF
```javascript
var inkjet = require('inkjet');

var filepath = './images/jpeg420exif.jpg';
var buf = fs.readFileSync(filepath);
inkjet.exif(buf, function(err, metadata) {
  // metadata -- an object that maps EXIF tags to string values
});
```

## API

### .exif(buf, [options], cb)
Get EXIF metadata for the image. The metadata tags defined in the Exif standard cover date and time information, camera settings, descriptions, resolution and  location information.

```javascript
inkjet.exif(buf, function(err, metadata) {
  // ...
});
```

### .decode(buf, [options], cb)
Decodes the JPEG image.
decoded: { width: number, height: number, data: Uint8Array }
```javsscript
inkjet.decode(buf, function(err, decoded) {
  // ...
});
```

### .encode(buf, options, cb);
Encodes buffer to a JPEG format.
```javascript
inkjet.encode(buf, function(err, encoded) {
  // ...
});
```

## Tests

To run the tests for _inkjet_:
```bash
$ npm test
```

## Contact

[Grigoriy Chudnov] (mailto:g.chudnov@gmail.com)


## License

Distributed under the [The MIT License (MIT)](https://github.com/gchudnov/inkjet/blob/master/LICENSE).
