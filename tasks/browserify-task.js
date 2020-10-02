import gulp from 'gulp';
import async from 'async';
import once from 'once';
import log from 'fancy-log';
import colors from 'ansi-colors';
import header from 'gulp-header';
import uglify from 'gulp-uglify';
import gulpIf from 'gulp-if';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import pkg from '../package.json';
import { isProduction, browserifyConfig } from './config';

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

function browserifyTask(next) {
  log('NODE_ENV:', colors.yellow(process.env.NODE_ENV));
  log('IS_PRODUCTION:', colors.yellow(isProduction.toString()));

  async.each(browserifyConfig.bundleConfigs, (bundleConfig, cb) => {
    cb = once(cb);

    const bundler = browserify({
      entries: bundleConfig.entries,
      insertGlobals: false,
      detectGlobals: true,
      standalone: bundleConfig.name,
      debug: browserifyConfig.debug
    });

    let handleEnd = () => {
      log('Bundled', colors.green(bundleConfig.outputName));
      cb();
    };

    const bundle = () => {
      log('Bundling', colors.green(bundleConfig.outputName));
      return bundler
        .transform("babelify", browserifyConfig.babelConfig)
        .bundle()
        .on('error', handleErrors)
        .pipe(source(bundleConfig.outputName))
        .pipe(buffer())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulpIf(bundleConfig.isUglify, uglify()))
        .pipe(gulp.dest(bundleConfig.dest))
        .on('end', handleEnd);
    };

    bundle();

  }, next);
}

export { browserifyTask };
