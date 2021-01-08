#!/usr/bin/env node

import * as path from 'path';
import { readFileSync, readFile, writeFile } from '../util/file';
import { swaggerCamelCasePropertiesToSnakeCase } from '..';
import program from 'commander';
import * as readline from 'readline';

const meta = JSON.parse(
  readFileSync(path.resolve(__dirname, '../../package.json')).toString(),
);

process.stdin.resume();
process.stdin.setEncoding('utf8');

program
  .version(meta.version)
  .usage(
    `
$ npx swagger-camelcase-properties-to-snakecase /path/to/some-swagger.yaml
or
$ cat /path/to/some-swagger.yaml | npx swagger-camelcase-properties-to-snakecase`,
  )
  .parse(process.argv);

let text = '';
const reader = readline.createInterface({
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
