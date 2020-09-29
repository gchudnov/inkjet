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
import pkg from "../package.json";

const srcDir = './test';
const dstDir = './test/browser';

const ignoreFiles = [
  `${srcDir}/util/file-writer.js`
];

const bundleConfig = {
  name: 'inkjet-test',
  entries: [
    `${srcDir}/buffer-util.spec.js`,
    `${srcDir}/color-util.spec.js`,
    `${srcDir}/encode.spec.js`,
  ],
  dest: dstDir,
  outputName: `inkjet-test-bundle.js`
};

const babelConfig = {
  presets: [
    "@babel/preset-env"
  ],
  plugins: [
    "add-module-exports",
  ]
};

export const browserifyConfig = {
  debug: true,
  bundleConfigs: [ bundleConfig ],
  babelConfig: babelConfig
};

function handleErrors(...args) {
  console.error(args);
  this.emit('end'); // Keep gulp from hanging on this task
}


function bundleTestTask(next) {
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
        .ignore(ignoreFiles)
        .transform("babelify", browserifyConfig.babelConfig)
        // .transform("brfs")
        .bundle()
        .on('error', handleErrors)
        .pipe(source(bundleConfig.outputName))
        .pipe(buffer())
        .pipe(gulp.dest(bundleConfig.dest))
        .on('end', handleEnd);
    };

    bundle();

  }, next);
}

export { bundleTestTask };
