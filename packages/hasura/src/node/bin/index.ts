#!/usr/bin/env node
import runScript from 'vilicando-core/lib/node/bin/runScript';

const scripts: {
  [command: string]: () => Promise<(argv?: object) => void>;
} = {
  codegen: async () => await import('./codegen').then(({ codegen }) => codegen)
};

runScript(
  scripts,
  {
    // Types
    '--url': String,
    '--secret': String,
    '--watch': Boolean,

    // Aliases
    '-u': '--url',
    '-s': '--secret',
    '-w': '--watch'
  },
  'codegen'
);
