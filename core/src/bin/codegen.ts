#!/usr/bin/env node
import { execSync } from 'child_process';
import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import dotenv from 'dotenv';
import { outputFileSync, removeSync } from 'fs-extra';
import { ISchema } from '../apollo/typings';

dotenv.config({ path: join(process.cwd(), '.env') });
dotenv.config({ path: join(process.cwd(), '../.env') });

const { GRAPHQL_HTTP, GRAPHQL_SECRET } = process.env;

const download = ({
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

const optimistic = () => {
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

const generate = ({
  '--url': url = GRAPHQL_HTTP,
  '--secret': secret = GRAPHQL_SECRET
}: {
  '--url'?: string;
  '--secret'?: string;
}) => {
  if (!url) return null;

  // generate extends for __optimistic-field
  optimistic();

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

export { download, generate };
