#!/usr/bin/env node
import { execSync } from 'child_process';
import { join } from 'path';
import { mkdirSync, copyFileSync } from 'fs';
import { getEnv } from '../env';

// read env
const { PORT } = getEnv();

const buildDir = join(process.cwd(), '.next');
const serverSrc = join(__dirname, '../server.js');
const serverDist = join(buildDir, 'server.js');

const copyFiles = () => {
  mkdirSync(buildDir, { recursive: true });
  console.info('  ✔ Folder created');
  copyFileSync(serverSrc, serverDist);
  console.info('  ✔ Files copied');
};

const build = () => {
  copyFiles();
  execSync(`next build`, { stdio: 'inherit' });
};

const exportStatic = () => {
  copyFiles();
  execSync(`next export`, { stdio: 'inherit' });
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

export { build, dev, exportStatic, start, up };
