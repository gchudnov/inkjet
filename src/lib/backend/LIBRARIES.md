Used external libraries:

- Read EXIF: [ExifReader v3.12.2](https://github.com/mattiasw/ExifReader)
- Decode JPEG: [pdf.js v2.5.207](https://github.com/mozilla/pdf.js)
- Encode JPEG: JPEGEncoder

## Upgrading libraries

### Read EXIF

```bash
git clone https://github.com/mattiasw/ExifReader.git
cd ExifReader
cp ./dist/exif-reader.js ./../inkjet/src/lib/backend/
```

### Decode JPEG

```bash
git clone git@github.com:mozilla/pdf.js.git
cd pdf.js/src/core
# embed imports
cp ./jpg.js ./../inkjet/src/lib/backend/
```
