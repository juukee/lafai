import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'; 
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    exports: 'named',
  },
  external: ['tslib'],
  plugins: [
    json(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      outDir: './dist/types'
    }),
    babel({
      include: ['src/**/*', 'dist/**/*'], 
      exclude: 'node_modules/**',
      babelHelpers: 'bundled' 
    })
  ]
}