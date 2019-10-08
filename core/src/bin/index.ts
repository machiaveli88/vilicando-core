#!/usr/bin/env node
import arg from 'arg';
import { CONFIG_FILE } from 'next/dist/next-server/lib/constants';
import { watchFile } from 'fs';

const devCommand = 'dev';
const { _: commands, ...args } = arg(
  {
    // Types
    '--help': Boolean,
    '--port': Number,
    '--dev': Boolean,
    '--latest': Boolean,
    '--url': String,
    '--secret': String,
    '--codegen': Boolean,

    // Aliases
    '-h': '--help',
    '-p': '--port',
    '-d': '--dev',
    '-l': '--latest',
    '-c': '--codegen'
  },
  {
    permissive: true
  }
);
const scripts: {
  [command: string]: () => Promise<(argv?: object) => void>;
} = {
  build: async () => await import('./scripts').then(({ build }) => build),
  dev: async () =>
    await import('./scripts').then(
      ({ codegenDownload, codegenGenerate, dev }) => async ({
        '--codegen': codegen,
        ...args
      }: any) => {
        if (codegen) {
          await codegenDownload(args);
          await codegenGenerate(args);
        }
        await dev(args);
      }
    ),
  start: async () => await import('./scripts').then(({ start }) => start),
  up: async () => await import('./scripts').then(({ up }) => up),
  'codegen:download': async () =>
    await import('./scripts').then(({ codegenDownload }) => codegenDownload),
  'codegen:generate': async () =>
    await import('./scripts').then(({ codegenGenerate }) => codegenGenerate),
  codegen: async () =>
    await import('./scripts').then(
      ({ codegenDownload, codegenGenerate }) => async args => {
        await codegenDownload(args);
        await codegenGenerate(args);
      }
    )
};
const command = commands[0] || devCommand;
const foundCommand = Boolean(scripts[command]);

/* SCRIPT */

['react', 'react-dom', 'antd'].forEach(dependency => {
  try {
    require.resolve(dependency);
  } catch (err) {
    console.warn(
      `The module '${dependency}' was not found. Vilicando-core requires it as dependency of your 'package.json'. To add it, run 'yarn add ${dependency}'`
    );
  }
});

if (!foundCommand && !args['--help']) {
  console.log('Command not found, run `vilicando-core --help` for help!');
  process.exit(0);
} else if (args['--help']) {
  console.log('No help found!');
  process.exit(0);
}
scripts[command]()
  .then(exec => exec(args))
  .catch(err => console.error(err));

// watch config in dev-mode
if (command === devCommand) {
  watchFile(`${process.cwd()}/${CONFIG_FILE}`, (cur: any, prev: any) => {
    if (cur.size > 0 || prev.size > 0) {
      console.log(
        `\n> Found a change in ${CONFIG_FILE}. Restart the server to see the changes in effect.`
      );
    }
  });
}
