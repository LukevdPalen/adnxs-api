/* eslint-disable */

const path = require('path');

const { eslint } = require('rollup-plugin-eslint');
const resolve = require('rollup-plugin-node-resolve');

const { main, dependencies } = require('./package.json');

module.exports = {
  input: path.join(__dirname, 'src', 'index.js'),
  output: {
    file: path.join(__dirname, main),
    format: 'umd',
    name: 'appnxs',
    sourcemap: true,
  },
  external: [...Object.keys(dependencies)],
  treeshake: true,
  plugins: [
    eslint(),
    resolve(),
  ],
  onwarn({message, code, ...rest}, formatter) {
    if (code && code === 'MISSING_GLOBAL_NAME')
      return;

    if (code && code === 'NON_EXISTENT_EXPORT')
      throw new Error(warning.message || warning);

    formatter({message, code, ...rest});
  },
};
