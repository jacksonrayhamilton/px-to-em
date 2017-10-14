import shiftHeader from 'rollup-plugin-shift-header';

export default [
  {
    input: 'pxToEm.mjs',
    output: {
      file: 'pxToEm.js',
      name: 'pxToEm',
      format: 'iife',
    },
    plugins: [
      shiftHeader(),
    ],
  },
  {
    input: 'test/test.mjs',
    output: {
      file: 'test/test.js',
      format: 'iife',
      sourcemap: true,
    },
  }
];
