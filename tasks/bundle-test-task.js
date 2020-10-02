import gulp from 'gulp';
import async from 'async';
import once from 'once';
import fs from 'fs';
import log from 'fancy-log';
import colors from 'ansi-colors';
import replace from 'gulp-replace';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import constants from '../test/util/constants';

const srcDir = './test';
const dstDir = './test/browser';

const ignoreFiles = [
  `${srcDir}/util/file-writer.js`
];

const paths = ['pathPng', 'path420', 'path422h', 'path422v', 'path444', 'pathAC', 'pathP', 'pathDCTF', 'pathCP', 'pathExif', 'pathBroken'];
const replacements = paths.map((p) => {
  return {
    name: p,
    search: `_fs["default"].readFileSync(${p})`,
    replacement: "Buffer.from('" + fs.readFileSync(constants[p], { encoding: 'base64' }) + "', 'base64')"
  };
}).reduce((acc, it) => {
  return Object.assign({ [it.name] : it }, acc);
}, {});

const bundleConfig = {
  name: 'inkjet-test',
  entries: [
    `${srcDir}/buffer-util.spec.js`,
    `${srcDir}/color-util.spec.js`,
    `${srcDir}/decode.spec.js`,
    `${srcDir}/encode.spec.js`,
    `${srcDir}/exif.spec.js`,
    `${srcDir}/info.spec.js`,
    `${srcDir}/magic.spec.js`,
    `${srcDir}/re-encode.spec.js`,
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
      insertGlobals: true,
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
        .bundle()
        .on('error', handleErrors)
        .pipe(source(bundleConfig.outputName))
        .pipe(buffer())
        .pipe(replace(replacements.pathPng.search, replacements.pathPng.replacement))
        .pipe(replace(replacements.path420.search, replacements.path420.replacement))
        .pipe(replace(replacements.path422h.search, replacements.path422h.replacement))
        .pipe(replace(replacements.path422v.search, replacements.path422v.replacement))
        .pipe(replace(replacements.path444.search, replacements.path444.replacement))
        .pipe(replace(replacements.pathAC.search, replacements.pathAC.replacement))
        .pipe(replace(replacements.pathP.search, replacements.pathP.replacement))
        .pipe(replace(replacements.pathDCTF.search, replacements.pathDCTF.replacement))
        .pipe(replace(replacements.pathCP.search, replacements.pathCP.replacement))
        .pipe(replace(replacements.pathExif.search, replacements.pathExif.replacement))
        .pipe(replace(replacements.pathBroken.search, replacements.pathBroken.replacement))
        .pipe(gulp.dest(bundleConfig.dest))
        .on('end', handleEnd);
    };

    bundle();

  }, next);
}

export { bundleTestTask };
