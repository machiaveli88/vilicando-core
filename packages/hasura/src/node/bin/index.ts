#!/usr/bin/env node
import runScript from 'vilicando-core/lib/node/bin/runScript';

const scripts: {
  [command: string]: () => Promise<(argv?: object) => void>;
} = {
  codegen: async () =>
    await import('./codegen').then(({ download, generate }) => args => {
      download(args);
      generate();
    }),
  'codegen:download': async () =>
    await import('./codegen').then(({ download }) => download),
  'codegen:generate': async () =>
    await import('./codegen').then(({ generate }) => generate)
};

runScript(
  scripts,
  {
    // Types
    '--url': String,
    '--secret': String,

    // Aliases
    '-u': '--url',
    '-s': '--secret'
  },
  'codegen'
);
