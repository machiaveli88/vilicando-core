#!/usr/bin/env node
import { join } from "path";
import runScript from "vilicando-core/lib/node/bin/runScript";
import { getEnv } from "vilicando-core/lib/node/utils";
import { generate as _generate } from "@graphql-codegen/cli";
import { existsSync, readFileSync, writeFileSync } from "fs";

// read env
const { GRAPHQL_HTTP, GRAPHQL_SECRET } = getEnv();

const codegen = async ({
  "--url": url = GRAPHQL_HTTP,
  "--secret": secret = GRAPHQL_SECRET,
  "--watch": watch = false,
}) =>
  !url
    ? null
    : await _generate(
        {
          schema: [
            {
              [url]: {
                headers: !secret
                  ? {}
                  : {
                      "x-hasura-admin-secret": secret,
                    },
              },
            },
          ],
          documents: "./graphql/*.{tsx,ts}",
          generates: {
            "./graphql/index.tsx": {
              plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo",
              ],
              config: {
                withHOC: false,
                withHooks: true,
                withComponent: false,
                apolloReactHooksImportFrom: "vilicando-hasura",
                apolloReactCommonImportFrom: "vilicando-hasura",
                typesPrefix: "T",
                namingConvention: {
                  typeNames: "change-case#pascalCase",
                  transformUnderscore: true,
                },
              },
            },
          },
          overwrite: true,
          watch,
          hooks: {
            afterStart: [],
            beforeDone: [],
            onWatchTriggered: [],
            onError: [],
            afterOneFileWrite: [],
            afterAllFileWrite: [
              "vilicando-hasura addReturnType",
              "prettier --write",
            ],
            beforeOneFileWrite: [],
            beforeAllFileWrite: [],
          },
        },
        true
      );

const addReturnType = async () => {
  const graphqlFile = join(process.cwd(), "graphql/index.tsx");

  if (existsSync(graphqlFile)) {
    const file: string = readFileSync(graphqlFile, "utf8").replace(
      /useQuery<(.*)>/g,
      (match: string, types: string, offset: number, string: string) => {
        const queryType = types.replace(
          /T(.*)Query,(.*)/g,
          (m, type) => `T${type}Query`
        );
        const start = string.indexOf(`export type ${queryType} = (`);
        const end = !!~start && string.indexOf(");", start);
        const typeDef =
          !!~start &&
          !!end &&
          string.substring(start + 17 + queryType.length, end - 1);

        if (!typeDef) return string;

        const type = typeDef
          .trim()
          .replace(
            /{ __typename\??: 'query_root' }\n {2}& {[^:]*:(.*)}/gs,
            (m, a) => {
              return !!a && a.trim();
            }
          );

        return `useQuery<${types}, ${type}>`;
      }
    );

    writeFileSync(graphqlFile, file, "utf8");
  }
};

const scripts: {
  [command: string]: () => Promise<(argv?: object) => void>;
} = {
  codegen: async () => new Promise((res) => res(codegen)),
  addReturnType: async () => new Promise((res) => res(addReturnType)),
};

runScript(
  scripts,
  {
    // Types
    "--url": String,
    "--secret": String,
    "--watch": Boolean,

    // Aliases
    "-u": "--url",
    "-s": "--secret",
    "-w": "--watch",
  },
  "codegen"
);
