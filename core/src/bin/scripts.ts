#!/usr/bin/env node
import { execSync } from 'child_process';
import { join } from 'path';
import fs from 'fs';

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

const dev = ({ '--dev': dev = true, '--port': port = 3000 }) =>
  execSync(
    port
      ? `cross-env NODE_ENV=${
          dev ? 'development' : 'production'
        } PORT=${port} node ${serverSrc}`
      : `cross-env NODE_ENV=${
          dev ? 'development' : 'production'
        } node ${serverSrc}`,
    {
      stdio: 'inherit'
    }
  );

const start = ({ '--dev': dev = false, '--port': port = 3000 }) =>
  execSync(
    port
      ? `cross-env NODE_ENV=${
          dev ? 'development' : 'production'
        } PORT=${port} node ${serverDist}`
      : `cross-env NODE_ENV=${
          dev ? 'development' : 'production'
        } node ${serverDist}`,
    {
      stdio: 'inherit'
    }
  );

const up = ({ '--latest': latest = true }: any) =>
  execSync(
    latest ? 'yarn upgrade-interactive --latest' : 'yarn upgrade-interactive',
    { stdio: 'inherit' }
  );

export { build, dev, start, up };
