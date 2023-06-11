import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser';
import cleanBeforeWrite from './build-plugins/clean-before-write';
import { readFileSync } from 'fs'
const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
)
export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named'
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named'
    },
  ],
  plugins: [
    commonjs(),
    json(),
    nodeResolve(),
    typescript({
      tsconfig: './tsconfig.json',
      outDir: './dist/types',
      declaration: true
    }),
    cleanBeforeWrite('dist'),
    terser()
  ],
}
