import * as fs from 'fs'
import { swaggerCamelCasePropertiesToSnakeCase } from '../src';

const nestedSwaggerYaml = fs.readFileSync('./nestedSwagger.yaml').toString().trim()
const snakeCaseNestedSwagger = fs.readFileSync('./snakeCaseNestedSwagger.yaml').toString().trim()

test('nested properties', () => {
  const result = swaggerCamelCasePropertiesToSnakeCase(nestedSwaggerYaml).trim()

  expect(result).toBe(snakeCaseNestedSwagger);
});
