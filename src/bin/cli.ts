#!/usr/bin/env node

import * as path from 'path';
import { readFile, writeFile } from '../util/file'
import { swaggerCamelCasePropertiesToSnakeCase } from '../'

process.stdin.resume();
process.stdin.setEncoding('utf8');

let text = '';
var reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
reader.on('line', (line: string) => {
  text += line + '\n'
});

const fileOption = process.argv.findIndex(v => ['-f', '--file'].includes(v))

async function updateFile(path: string) {
  const s = await readFile(path)
  await writeFile(path, swaggerCamelCasePropertiesToSnakeCase(s));
}

if (fileOption !== -1) {
  const absPath = path.resolve(process.cwd(), process.argv[fileOption + 1]);

  updateFile(absPath).then(() => process.exit(0)).catch(() => process.exit(1))
} else {
  reader.on('close', () => {
    reader.write(swaggerCamelCasePropertiesToSnakeCase(text.trim()))
  });
}
