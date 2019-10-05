#!/usr/bin/env node
import { execSync } from 'child_process';
import { join, resolve } from 'path';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import glob from 'glob';
import { outputFile, remove } from 'fs-extra';

dotenv.config({ path: path.join(process.cwd(), '.env') });
dotenv.config({ path: path.join(process.cwd(), '../.env') });

const { PORT, GRAPHQL_HTTP, GRAPHQL_SECRET } = process.env;

const buildDir = join(process.cwd(), '.next');
const serverSrc = join(__dirname, '../server/server.js');
const serverDist = join(buildDir, 'server.js');

const build = () =>
  fs.mkdir(buildDir, { recursive: true }, err => {
    if (err) throw err;

    return fs.copyFile(serverSrc, serverDist, err => {
      if (err) throw err;

      return execSync(`next build`, {
        stdio: 'inherit'
      });
    });
  });

const dev = ({ '--dev': dev = true, '--port': port = PORT || 3000 }) =>
  execSync(
    port
      ? `cross-env NODE_ENV=${
          dev ? 'development' : 'production'
        } PORT=${port} node '${serverSrc}'`
      : `cross-env NODE_ENV=${
          dev ? 'development' : 'production'
        } node '${serverSrc}'`,
    {
      stdio: 'inherit'
    }
  );

const start = ({ '--dev': dev = false, '--port': port = PORT || 3000 }) =>
  execSync(
    port
      ? `cross-env NODE_ENV=${
          dev ? 'development' : 'production'
        } PORT=${port} node '${serverDist}'`
      : `cross-env NODE_ENV=${
          dev ? 'development' : 'production'
        } node '${serverDist}'`,
    {
      stdio: 'inherit'
    }
  );

const up = ({ '--latest': latest = true }: { '--latest'?: boolean }) =>
  execSync(
    latest ? 'yarn upgrade-interactive --latest' : 'yarn upgrade-interactive',
    { stdio: 'inherit' }
  );

const codegenDownload = ({
  '--url': url = GRAPHQL_HTTP,
  '--secret': secret = GRAPHQL_SECRET
}: {
  '--url'?: string;
  '--secret'?: string;
}) =>
  url
    ? execSync(
        secret
          ? `apollo schema:download --endpoint=${url} --header="X-Hasura-Admin-Secret: ${secret}"`
          : `apollo schema:download --endpoint=${url}`,
        {
          stdio: 'inherit'
        }
      )
    : undefined;

const codegenGenerate = async ({
  '--url': url = GRAPHQL_HTTP,
  '--secret': secret = GRAPHQL_SECRET
}: {
  '--url'?: string;
  '--secret'?: string;
}) => {
  const cmd = (await url)
    ? execSync(
        url
          ? `apollo codegen:generate typings --endpoint=${url} --header="X-Hasura-Admin-Secret: ${secret}" --target=typescript --includes=**/*.{ts,tsx} --excludes=node_modules --tagName=gql --outputFlat`
          : `apollo codegen:generate typings --endpoint=${url} --target=typescript --includes=**/*.{ts,tsx} --excludes=node_modules --tagName=gql --outputFlat`,
        { stdio: 'inherit' }
      )
    : undefined;

  let output = '';
  await glob.sync(resolve(process.cwd(), 'typings/*.ts')).forEach(file => {
    const [dir, extension] = file.split('.');
    const [fileName] = dir.split('/').reverse();

    if (fileName !== 'index' && extension === 'ts')
      if (fileName === 'globalTypes')
        remove(join(process.cwd(), 'typings/globalTypes.ts'), err => {
          console.log('  ✔ Delete typings/globalTypes.ts');
          if (err) return console.error(err);
        });
      else
        output += `
export * from './${fileName}'`;
  });

  await outputFile(join(process.cwd(), 'typings/index.ts'), output, err => {
    if (err) return console.log(err);
  });

  return cmd;
};

export { build, dev, start, up, codegenDownload, codegenGenerate };
