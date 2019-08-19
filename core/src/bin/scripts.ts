#!/usr/bin/env node
import { execSync } from 'child_process';
import { join } from 'path';

const build = () => {
  const config = join(__dirname, '../../tsconfig.server.json');
  const buildNextCli = 'next build';
  const buildCustomServerCli = `tsc --project ${config} --baseUrl ${process.cwd()} --outDir .next`;

  return execSync(/* buildNextCli + ' && ' + */ buildCustomServerCli, {
    stdio: 'inherit'
  });
};

const up = ({ '--latest': latest = true }: any) =>
  execSync(
    latest ? 'yarn upgrade-interactive --latest' : 'yarn upgrade-interactive',
    { stdio: 'inherit' }
  );

export { build, up };
