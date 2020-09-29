if(!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

export const isProduction = (process.env.NODE_ENV === 'production');

const srcDir = './build';
const dstDir = './dist';

const bundleConfig = {
  name: 'inkjet',
  entries: [ `${srcDir}/main.js` ],
  dest: dstDir,
  outputName: `inkjet${isProduction ? '.min' : ''}.js`,
  isUglify: isProduction,
};

export const browserifyConfig = {
  debug: !isProduction,
  bundleConfigs: [ bundleConfig ]
};
