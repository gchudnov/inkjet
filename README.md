# inkjet
Image processor

## EXIF
https://github.com/mattiasw/ExifReader

## DECODE
https://github.com/notmasteryet/jpgjs

## ENCODE
https://github.com/eugeneware/jpeg-js


### jpgjs -- Updating to a fresh version
```
$ cd projects/
$ git clone https://github.com/notmasteryet/jpgjs.git
$ cd jpgjs/
$ git clone https://github.com/mozilla/pdf.js.git
$ grunt
$ cp ./build/pdfjs.js inkjet/lib/
```

### ExifReader -- latest version
```
$ cd projects/
$ git clone https://github.com/mattiasw/ExifReader.git
$ cd ExifReader
$ cp ./js/ExifReader.js ./../inkjet/lib/
```
