import gulp from 'gulp';
import header from 'gulp-header';
import uglify from 'gulp-uglify';
import gulpIf from 'gulp-if';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream2';
import pkg from '../package.json';

const banner = [
  '/*',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

function handleErrors(...args) {
  console.error(args);
  this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('script', () => {

  const isProduction = (process.env.NODE_ENV === 'production');

  const bundleConfig = {
    name: 'inkjet',
    entries: [`./src/index.js`], // require.resolve('babel-polyfill'),
    dest: './dist',
    outputName: `inkjet${isProduction ? '.min' : ''}.js`,
    isUglify: isProduction,
  };

  let bundler = browserify({
    entries: bundleConfig.entries,
    insertGlobals: false,
    detectGlobals: true,
    standalone: bundleConfig.name,
    debug: false
  });

  let bundle = () => {
    return bundler
      .bundle()
      .on('error', handleErrors)
      .pipe(source(bundleConfig.outputName))
      .pipe(header(banner, { pkg: pkg }))
      .pipe(gulpIf(bundleConfig.isUglify, uglify()))
      .pipe(gulp.dest(bundleConfig.dest))
  };

  bundler
    .transform(babelify.configure({
      "presets": [
        ["env", {
          "targets": {
            "browsers": ["last 2 versions", "safari >= 9", "ie >= 10"]
          }
        }]
      ],
      "plugins": [
        "add-module-exports",
        "transform-es2015-modules-commonjs",
      ]
    }));

  bundle();
});
