'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: false});
var browserify = require('browserify');
var source = require('vinyl-source-stream2');
var path = require('path');


var pkg = require('./package.json');
var banner = [
  '/*',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('script', function() {
  var bundleStream = browserify({
    entries: './index.js',
    insertGlobals: false,
    detectGlobals: true,
    standalone: 'inkjet',
    fullPaths: false
  })
    .bundle();

  return bundleStream
    .pipe(source('inkjet.js'))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist'))
    .pipe($.uglify())
    .pipe($.header(banner, {pkg: pkg}))
    .pipe($.rename('inkjet.min.js'))
    .pipe(gulp.dest('./dist'));
});
