import * as fs from 'fs';

export function readFileSync(...args: Parameters<typeof fs.readFileSync>) {
  return fs.readFileSync(...args);
}

export function readFile(filePath: string): Promise<string> {
  return exec(fs.readFile, filePath, 'utf8');
}

export function writeFile(filePath: string, data: string): Promise<void> {
  return exec(fs.writeFile, filePath, data);
}

type AnyFunction = (...args: any[]) => any;

function exec(fn: AnyFunction, ...args: any[]): Promise<any> {
  return new Promise((resolve, reject) =>
    fn(
      ...args.concat((err: any, res: any) =>
        err ? reject(err) : resolve(res),
      ),
    ),
  );
}
