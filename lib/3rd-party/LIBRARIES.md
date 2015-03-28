Used libraries:

* Read EXIF: [ExifReader](https://github.com/mattiasw/ExifReader)
* Decode JPEG: [jpgjs](https://github.com/notmasteryet/jpgjs)
* Encode JPEG: [jpeg-js](https://github.com/eugeneware/jpeg-js)

## Upgrading libraries

### jpgjs
```
$ cd projects/
$ git clone https://github.com/notmasteryet/jpgjs.git
$ cd jpgjs/
$ git clone https://github.com/mozilla/pdf.js.git
$ grunt
$ cp ./build/pdfjs.js inkjet/lib/
```

### ExifReader
```
$ cd projects/
$ git clone https://github.com/mattiasw/ExifReader.git
$ cd ExifReader
$ cp ./js/ExifReader.js ./../inkjet/lib/
```
