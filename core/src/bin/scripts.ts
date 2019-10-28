#!/usr/bin/env node
import { execSync } from 'child_process';
import { join } from 'path';
import { readFileSync, readdirSync, mkdirSync, copyFileSync } from 'fs';
import dotenv from 'dotenv';
import { outputFileSync, removeSync } from 'fs-extra';
import { ISchema } from '../apollo/typings';

dotenv.config({ path: join(process.cwd(), '.env') });
dotenv.config({ path: join(process.cwd(), '../.env') });

const { PORT, GRAPHQL_HTTP, GRAPHQL_SECRET } = process.env;

const buildDir = join(process.cwd(), '.next');
const serverSrc = join(__dirname, '../server/server.js');
const serverDist = join(buildDir, 'server.js');

const build = () => {
  mkdirSync(buildDir, { recursive: true });
  console.info('  ✔ Folder created');
  copyFileSync(serverSrc, serverDist);
  console.info('  ✔ Files copied');
  execSync(`next build`, { stdio: 'inherit' });
};

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
    : null;

const codegenOptimistic = () => {
  const schema = join(process.cwd(), 'schema.json');

  if (schema) {
    const { __schema } = JSON.parse(readFileSync(schema).toString()) as ISchema;
    const { types } = __schema || {};
    const fields = types.filter(({ kind }) => kind === 'OBJECT');

    let output = `/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL extendings for __optimistic-field
// ====================================================

import gql from 'graphql-tag';
`;
    fields.forEach(({ name }) => {
      output += `
gql\`
  extend type ${name} {
    __optimistic: Boolean
  }
\`
    `;
    });
    outputFileSync(join(process.cwd(), 'graphql/optimistic.ts'), output);

    console.info('  ✔ Creating extendings for __optimistic-field');
  }
};

const codegenGenerate = ({
  '--url': url = GRAPHQL_HTTP,
  '--secret': secret = GRAPHQL_SECRET
}: {
  '--url'?: string;
  '--secret'?: string;
}) => {
  if (!url) return null;

  // generate extends for __optimistic-field
  codegenOptimistic();

  const cmd = execSync(
    secret
      ? `apollo codegen:generate typings --endpoint=${url} --target=typescript --includes=graphql/*.ts --tagName=gql --addTypename --header="X-Hasura-Admin-Secret: ${secret}"`
      : `apollo codegen:generate typings --endpoint=${url} --target=typescript --includes=graphql/*.ts --tagName=gql --addTypename`, // todo: --watch https://stackoverflow.com/questions/13695046/watch-a-folder-for-changes-using-node-js-and-print-file-paths-when-they-are-cha
    { stdio: 'inherit' }
  );

  let output = `/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL type exports
// ====================================================

`;
  const files = readdirSync(join(process.cwd(), 'graphql/typings'));
  files.forEach(file => {
    const [dir, extension] = file.split('.');
    const [fileName] = dir.split('/').reverse();

    if (fileName !== 'index' && extension === 'ts')
      output += `export * from './${fileName}'
`;
  });
  outputFileSync(join(process.cwd(), 'graphql/typings/index.ts'), output);

  removeSync(join(process.cwd(), 'typings'));
  console.info('  ✔ Deleting typings/globalTypes.ts');

  return cmd;
};

export { build, dev, start, up, codegenDownload, codegenGenerate };
