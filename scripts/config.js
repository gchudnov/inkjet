if(!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

export const isProduction = (process.env.NODE_ENV === 'production');

const srcDir = './src';
const dstDir = './dist';

const bundleConfig = {
  name: 'inkjet',
  entries: [ `${srcDir}/index.js` ],
  dest: dstDir,
  outputName: `inkjet${isProduction ? '.min' : ''}.js`,
  isUglify: isProduction,
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
  debug: !isProduction,
  bundleConfigs: [ bundleConfig ],
  babelConfig: babelConfig
};
