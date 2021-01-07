import * as yaml from 'js-yaml';

function snakecase(str: string) {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    if (!/^([A-Z])$/.test(str[i])) {
      result += str[i]
      continue
    }
    if (/^([a-z])$/.test(str[i - 1]) || /^\d$/.test(str[i - 1])) {
      result += '_'
    }
    result += str[i].toLowerCase()
  }
  return result
}

function propertiesToSnakeCase(properties: Record<string, any>) {
  const result: Record<string, any> = {}
  Object.entries(properties).forEach(([propertyName, value]) => {
    result[snakecase(propertyName)] = value
  })
  return result
}

function requiredToSnakeCase(required: string[]) {
  return required.map(propertyName => snakecase(propertyName))
}

function isObject(v: any): v is Record<string, any> {
  return typeof v === 'object' && v !== null
}

function camelCasePropertiesToSnakeCase(obj: any) {
  if (isObject(obj)) {
    const schemas: Record<string, any> = {}
    Object.entries(obj).forEach(([schemaName, schema]: [string, any]) => {
      schemas[schemaName] = {
        ...schema
      };

      if (schemas[schemaName].properties) {
        schemas[schemaName].properties = camelCasePropertiesToSnakeCase(propertiesToSnakeCase(schemas[schemaName].properties))
      }

      if (isObject(schemas[schemaName].additionalProperties) && isObject(schemas[schemaName].additionalProperties.properties)) {
        schemas[schemaName].additionalProperties.properties = camelCasePropertiesToSnakeCase(propertiesToSnakeCase(schemas[schemaName].additionalProperties.properties))
      }

      if (schemas[schemaName].required) {
        schemas[schemaName].required = requiredToSnakeCase(schemas[schemaName].required)
      }
    })

    return schemas
  }
  return obj
}

export function swaggerCamelCasePropertiesToSnakeCase(swaggerYaml: string) {
  const swagger = yaml.load(swaggerYaml) as any

  if (swagger && swagger.components && swagger.components.schemas) {
    return yaml.dump({
      ...swagger,
      components: {
        ...swagger.components,
        schemas: camelCasePropertiesToSnakeCase(swagger.components.schemas)
      }
    })
  }
  return yaml.dump(swagger)
}
