#!/usr/bin/env node
import { execSync } from 'child_process';
import { join } from 'path';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { outputFileSync, removeSync } from 'fs-extra';
import { ISchema } from '../../typings';
import { getEnv } from 'vilicando-core/lib/node/env';

// read env
const { GRAPHQL_HTTP, GRAPHQL_SECRET } = getEnv();

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
          ? `apollo schema:download graphql/schema.json --endpoint=${url} --header="X-Hasura-Admin-Secret: ${secret}"`
          : `apollo schema:download graphql/schema.json --endpoint=${url}`,
        {
          stdio: 'inherit'
        }
      )
    : null;

const optimistic = () => {
  const schema = join(process.cwd(), 'graphql/schema.json');

  if (existsSync(schema)) {
    const { __schema } = JSON.parse(readFileSync(schema).toString()) as ISchema;
    __schema.types = (__schema || {}).types.map(type => {
      if (type.kind === 'OBJECT')
        return {
          ...type,
          fields: [
            ...type.fields,
            {
              name: '__optimistic',
              description: null,
              args: [],
              type: {
                kind: 'SCALAR',
                name: 'Boolean',
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ]
        };

      return type;
    });
    outputFileSync(schema, JSON.stringify({ __schema }));

    console.info('  ✔ Creating extendings for __optimistic-field');
  }
};

const generate = () => {
  // generate extends for __optimistic-field
  optimistic();

  const cmd = execSync(
    `apollo codegen:generate typings --localSchemaFile=graphql/schema.json --target=typescript --includes=graphql/*.ts --tagName=gql --addTypename`,
    { stdio: 'inherit' }
  ); // todo: --watch https://stackoverflow.com/questions/13695046/watch-a-folder-for-changes-using-node-js-and-print-file-paths-when-they-are-cha

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
