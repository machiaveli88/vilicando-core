#!/usr/bin/env node
import runScript from './runScript';

const scripts: {
  [command: string]: () => Promise<(argv?: object) => void>;
} = {
  build: async () => await import('./scripts').then(({ build }) => build),
  dev: async () => await import('./scripts').then(({ dev }) => dev),
  export: async () =>
    await import('./scripts').then(({ exportStatic }) => exportStatic),
  pwa: async () => await import('./pwa').then(({ pwa }) => pwa),
  start: async () => await import('./scripts').then(({ start }) => start),
  up: async () => await import('./scripts').then(({ up }) => up)
};

runScript(scripts, {
  // Types
  '--help': Boolean,
  '--port': Number,
  '--dev': Boolean,
  '--latest': Boolean,
  '--skip': Boolean,

  // Aliases
  '-h': '--help',
  '-p': '--port',
  '-d': '--dev',
  '-l': '--latest',
  '-s': '--skip'
});
