#!/usr/bin/env node
import { execSync } from 'child_process';
import { join } from 'path';

const dir = join(__dirname, '../..');
const config = join(dir, 'tsconfig.server.json');
const buildCustomServerCli = `tsc --project ${config} --baseUrl ${process.cwd()} --outDir .next`;

const build = () =>
  execSync('next build && ' + buildCustomServerCli, {
    stdio: 'inherit'
  });

const dev = () => {
  console.log(`ts-node --project ${config} ${dir}/server.ts`);
  return execSync(
    `ts-node --project ${config} ${dir}/server.ts`,
    /* `${buildCustomServerCli} && ${process.cwd()}/.next/server.js` */ {
      stdio: 'inherit'
    }
  );
};

const up = ({ '--latest': latest = true }: any) =>
  execSync(
    latest ? 'yarn upgrade-interactive --latest' : 'yarn upgrade-interactive',
    { stdio: 'inherit' }
  );

export { build, dev, up };
