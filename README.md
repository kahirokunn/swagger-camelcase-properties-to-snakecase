# swagger-camelcase-properties-to-snakecase

swagger camelcase properties to snakecase

## Install

```sh
$ npm install -g @kahirokunn/swagger-camelcase-properties-to-snakecase
```

## Usage

```
cat __tests__/nestedSwagger.yaml | npx @kahirokunn/swagger-camelcase-properties-to-snakecase > test.yaml
```

## Spec

```typescript
import * as fs from 'fs'
import { swaggerCamelCasePropertiesToSnakeCase } from '../src';

const nestedSwaggerYaml = fs.readFileSync('./nestedSwagger.yaml').toString().trim()
const snakeCaseNestedSwagger = fs.readFileSync('./snakeCaseNestedSwagger.yaml').toString().trim()

test('nested properties', () => {
  const result = swaggerCamelCasePropertiesToSnakeCase(nestedSwaggerYaml).trim()

  expect(result).toBe(snakeCaseNestedSwagger);
});
```
