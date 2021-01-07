#!/usr/bin/env node

import * as path from 'path';
import { readFile, writeFile } from '../util/file';
import { swaggerCamelCasePropertiesToSnakeCase } from '../';
import program from 'commander';

// tslint:disable-next-line
const meta = require('../../package.json');

process.stdin.resume();
process.stdin.setEncoding('utf8');

program
  .version(meta.version)
  .usage('</path/to/some-swagger.yaml>')
  .usage(
    'cat /path/to/some-swagger.yaml | npx swagger-camelcase-properties-to-snakecase',
  )
  .parse(process.argv);

let text = '';
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
reader.on('line', (line: string) => {
  text += line + '\n';
});

async function updateFile(path: string) {
  const s = await readFile(path);
  await writeFile(path, swaggerCamelCasePropertiesToSnakeCase(s));
}

const swaggerPath = program.args[0];

if (swaggerPath) {
  const absPath = path.resolve(process.cwd(), swaggerPath);

  updateFile(absPath)
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
} else {
  reader.on('close', () => {
    reader.write(swaggerCamelCasePropertiesToSnakeCase(text.trim()));
  });
}
