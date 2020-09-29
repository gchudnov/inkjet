# CHANGELOG

## 3.0.0
- Should be a drop-in replacement for 2.x, no public API changes.
- Updated encoding, decoding and exif reading libraries.
- Add progressive JPEG decoding.
- Add Uint8ClampedArray support.
- Updated project dependencies.

## 2.1.2
- Fixed import in node.js [#3](https://github.com/gchudnov/inkjet/issues/3)

## 2.1.1
- Fixed entrypoint

## 2.1.0
- Updated dependencies.
- Migrated code to ES6

## 2.0.2
- Updated dependencies.
- Fixed missing /dist directory.

## 2.0.1
- Updated dependencies.

## 2.0.0
- Refined API:
    - `.info()` returns an Error for a broken image.
    - `.magic()` returns an Error for a broken image.
    - `.exif()` returns an empty object for an image without EXIF.
- Updated dependencies.
- Improved tests.
- Updated examples.

## 1.2.0
- Added method to return JPEG dimensions.

## 1.1.0
- Added JPEG file-type detection.

## 1.0.0
- Initial release.
