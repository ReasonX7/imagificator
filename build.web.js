const fs = require('fs-extra')
const path = require('path')
const rollup = require('rollup')

const resolve = require('@rollup/plugin-node-resolve').default
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('@rollup/plugin-typescript')
const html = require('@rollup/plugin-html')

const template = ({ bundle }) => {
  const closedBodyTag = '</body>'
  const code = `\n<script>\n${bundle['index.js'].code}\n</script>\n`
  return fs
    .readFileSync('./src/web/index.html')
    .toString()
    .replace(closedBodyTag, code + closedBodyTag)
}

const build = async () => {
  const htmlBundle = await rollup.rollup({
    input: './src/web/index.ts',
    external: [],
    plugins: [
      commonjs(),
      resolve(),
      typescript(),
      html({ template })
    ]
  })

  const htmlOutput = await htmlBundle
    .generate({ format: 'iife' })
    .then(b => b.output.find(o => o.fileName === 'index.html'))

  const codeSource = `
import fs from "fs";
import path from "path";

export const indexHtml = fs.readFileSync(path.join(__dirname, "index.html")).toString();
  `.trim();

  await Promise.all([
    fs.outputFile(path.join(__dirname, 'dist/web/index.html'), htmlOutput.source),
    fs.outputFile(path.join(__dirname, 'dist/web/index.ts'), codeSource)
  ])
}

build()
