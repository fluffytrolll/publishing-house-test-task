/* eslint-disable linebreak-style */
const srcPuth = 'src';
const destPath = 'build';

const config = {
  src: {
    root: srcPuth,
    sass: `${srcPuth}/assets/scss`,
    js: `${srcPuth}/assets/js`,
    pug: `${srcPuth}/pug`,
  },
  dest: {
    root: destPath,
    html: destPath,
    css: `${destPath}/assets/css`,
    js: `${destPath}/assets/js`,
  },
  setEnv() {
    this.isProd = process.argv.includes('--prod');
    this.isDev = !this.isProd;
  },
};

export default config;
