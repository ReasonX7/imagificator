const rollup = require('rollup')
const path = require('path')
const autoExternal = require('rollup-plugin-auto-external')

const resolve = require('@rollup/plugin-node-resolve').default
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('@rollup/plugin-typescript')

const config = {
  input: './src/node/index.ts',
  plugins: [
    autoExternal({
      builtins: true,
      dependencies: true
    }),
    commonjs(),
    resolve({ preferBuiltins: true }),
    typescript()
  ]
}

const build = async () => {
  const bundle = await rollup.rollup(config)


}

build()
