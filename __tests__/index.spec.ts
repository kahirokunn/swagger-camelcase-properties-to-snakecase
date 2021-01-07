import * as fs from 'fs'
import * as path from 'path'
import { swaggerCamelCasePropertiesToSnakeCase } from '../src';

const nestedSwaggerYaml = fs.readFileSync(path.resolve(__dirname, './nestedSwagger.yaml')).toString().trim()
const snakeCaseNestedSwagger = fs.readFileSync(path.resolve(__dirname, './snakeCaseNestedSwagger.yaml')).toString().trim()

test('nested properties', () => {
  const result = swaggerCamelCasePropertiesToSnakeCase(nestedSwaggerYaml).trim()

  expect(result).toBe(snakeCaseNestedSwagger);
});
