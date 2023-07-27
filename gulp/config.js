/* eslint-disable linebreak-style */
const srcPuth = 'src';
const buildPath = 'build';

const config = {
  src: {
    root: srcPuth,
    scss: `${srcPuth}/assets/scss`,
    javascript: `${srcPuth}/assets/js`,
  },
  dest: {
    root: buildPath,
    scss: `${buildPath}/assets/css`,
    javascript: `${buildPath}/assets/js`,
  },
  setEnv() {
    this.isProd = process.argv.includes('--prod');
    this.isDev = !this.isProd;
  },
};

export default config;
