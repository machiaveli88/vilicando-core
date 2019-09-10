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

const dev = () =>
  execSync(`node ${serverSrc}`, {
    stdio: 'inherit'
  });

const start = () =>
  execSync(`cross-env NODE_ENV=production node ${serverDist}`, {
    stdio: 'inherit'
  });

const up = ({ '--latest': latest = true }: any) =>
  execSync(
    latest ? 'yarn upgrade-interactive --latest' : 'yarn upgrade-interactive',
    { stdio: 'inherit' }
  );

export { build, dev, start, up };
