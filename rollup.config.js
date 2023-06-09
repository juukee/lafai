import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
export default {
  input: 'src/index.ts',
  output: {
    name: 'lafai',
    exports: 'named',
    dir: 'dist',
    format: 'umd',
    sourcemap: true,
    globals: {
      util: 'require$$1',
      stream: 'stream',
      path: 'require$$1$1',
      http: 'require$$3',
      https: 'require$$4',
      url: 'require$$0$1',
      fs: 'require$$6',
      assert: 'require$$4$1',
      tty: 'require$$0$3',
      os: 'require$$0$2',
      zlib: 'zlib',
      events: 'EventEmitter'
    },
    dir: 'dist',
    exports: 'named',

  },
  external: ['tslib'],
  plugins: [
    commonjs(),
    json(),
    resolve({
      browser: true
    }),
    typescript({
      tsconfig: './tsconfig.json',
      outDir: './dist/types'
    }),
    nodePolyfills({
      include: ['util','stream', 'path', 'http', 'https', 'url', 'fs', 'assert', 'tty', 'os', 'zlib', 'events']
    }),
    terser(),
    babel({
      include: ['src/**/*', 'dist/**/*'], 
      exclude: 'node_modules/**',
      babelHelpers: 'bundled' 
    })
  ]
}