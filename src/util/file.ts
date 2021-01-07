import * as fs from 'fs';

export function readFile(filePath: string): Promise<string> {
  return exec(fs.readFile, filePath, 'utf8');
}

export function writeFile(filePath: string, data: string): Promise<void> {
  return exec(fs.writeFile, filePath, data);
}

function exec(fn: Function, ...args: any[]): Promise<any> {
  return new Promise((resolve, reject) => {
    fn.apply(
      undefined,
      args.concat((err: any, res: any) => {
        if (err) reject(err);
        resolve(res);
      }),
    );
  });
}
