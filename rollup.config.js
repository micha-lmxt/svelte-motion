 
import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import autoPreprocess from 'svelte-preprocess';
import replace from "@rollup/plugin-replace";
import pkg from './package.json'
import commonjs from '@rollup/plugin-commonjs';

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase())

const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
]

export default [{
  input: 'src/index.js',
  output: [
    { file: pkg.module, format: 'es',exports: "named" },
    { file: pkg.main, format: 'umd', name },
  ],
  plugins: [
    svelte({
      preprocess: autoPreprocess(),
    }),
    resolve(),
    replace({
        "process.env.NODE_ENV": JSON.stringify("development"),
    })
  ],
  external
},
{
  input: 'src/custom/motion-base.js',
  output: [
    { dir:"./lib", format: 'iife',exports: "named" }
  ],
  plugins: [
    svelte({
    }),
    resolve(),
    replace({
        "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
  ],
  external
}
]