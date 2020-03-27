#!/usr/bin/env node
import runScript from "./runScript";

const scripts: {
  [command: string]: () => Promise<(argv?: object) => void>;
} = {
  build: async () => await import("./scripts").then(({ build }) => build),
  dev: async () => await import("./scripts").then(({ dev }) => dev),
  export: async () =>
    await import("./scripts").then(({ exportStatic }) => exportStatic),
  lambda: async () => await import("./lambda").then(({ lambda }) => lambda),
  pwa: async () => await import("./pwa").then(({ pwa }) => pwa),
  start: async () => await import("./scripts").then(({ start }) => start),
  up: async () => await import("./scripts").then(({ up }) => up),
};

runScript(scripts, {
  // Types
  "--help": Boolean,
  "--port": Number,
  "--dev": Boolean,
  "--latest": Boolean,
  "--skip": Boolean,
  "--build": Boolean,
  "--src": String,
  "--dest": String,
  "--timeout": Number,
  "--url": String,

  // Aliases
  "-h": "--help",
  "-p": "--port",
  "-d": "--dev",
  "-l": "--latest",
  "-s": "--skip",
  "-b": "--build",
});
