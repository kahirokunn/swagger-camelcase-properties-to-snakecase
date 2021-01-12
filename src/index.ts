import * as yaml from 'js-yaml';
import jp from 'jsonpath';

function snakecase(str: string) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (!/^([A-Z])$/.test(str[i])) {
      result += str[i];
      continue;
    }
    if (/^([a-z])$/.test(str[i - 1]) || /^\d$/.test(str[i - 1])) {
      result += '_';
    }
    result += str[i].toLowerCase();
  }
  return result;
}

function renameKeys<
  T extends Record<string, any>,
  U extends Record<string, any> = T
>(renameFn: (s: string) => string) {
  return (v: T) =>
    Object.keys(v).reduce(
      (acc, k) => ({ ...acc, [renameFn(k)]: v[k] }),
      {} as U,
    );
}

export function swaggerCamelCasePropertiesToSnakeCase(swaggerYaml: string) {
  const swagger = yaml.load(swaggerYaml);

  // best is: `jp.apply(swagger, '$..properties.*~', snakecase)`
  // but package does not support ~ query.
  jp.apply(swagger, '$..properties', renameKeys(snakecase));
  jp.apply(
    swagger,
    '$.paths',
    renameKeys((path) => path.replace(/{(.*?)}/g, snakecase)),
  );
  jp.apply(swagger, '$..parameters[*].name', snakecase);
  jp.apply(swagger, '$..required[*]', snakecase);
  return yaml.dump(swagger);
}
