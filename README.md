# inkjet
Image processor

## Decode JPEG
```javascript
var inkjet = require('inkjet');

var filepath = './images/jpeg420exif.jpg';
var jpegData = fs.readFileSync(filepath);

inkjet.decode(jpegData, function(err, decoded) {
  // decoded: { width: number, height: number, data: Uint8Array }
});
```

## Encode JPEG
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

lib.encode(buf, options, function(err, encoded) {
  // encoded: { width: number, height: number, data: Uint8Array }
});
```

## Read EXIF
```javascript
var inkjet = require('inkjet');

var filepath = './images/jpeg420exif.jpg';
var jpegData = fs.readFileSync(filepath);
lib.exif(jpegData, function(err, metadata) {
  // metadata -- an object that maps EXIF tags to string values
});
```
