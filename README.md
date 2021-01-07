# swagger-camelcase-properties-to-snakecase

swagger camelcase properties to snakecase

## Install

```sh
$ npm install -g swagger-camelcase-properties-to-snakecase
```

## Usage

### stdio

```
cat __tests__/nestedSwagger.yaml | npx swagger-camelcase-properties-to-snakecase
```

### fix file

```
npx swagger-camelcase-properties-to-snakecase __tests__/nestedSwagger.yaml
```

## Spec

```typescript
import * as fs from 'fs'
import * as path from 'path'
import { swaggerCamelCasePropertiesToSnakeCase } from 'swagger-camelcase-properties-to-snakecase';

const nestedSwaggerYaml = fs.readFileSync(path.resolve(__dirname, './nestedSwagger.yaml')).toString().trim()
const snakeCaseNestedSwagger = fs.readFileSync(path.resolve(__dirname, './snakeCaseNestedSwagger.yaml')).toString().trim()

test('nested properties', () => {
  const result = swaggerCamelCasePropertiesToSnakeCase(nestedSwaggerYaml).trim()

  expect(result).toBe(snakeCaseNestedSwagger);
});
```
