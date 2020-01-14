#!/usr/bin/env node
import { execSync } from 'child_process';
import { join } from 'path';
import { copyFiles, getEnv } from '../utils';

interface IManifest {
  name?: string;
  short_name?: string;
  icons?: Array<{
    src: string;
    sizes: string;
    type?:
      | 'image/apng'
      | 'image/bmp'
      | 'image/gif'
      | 'image/x-icon'
      | 'image/jpeg'
      | 'image/png'
      | 'image/svg+xml'
      | 'image/tiff'
      | 'image/webp';
  }>;
  start_url?: string;
  background_color?: string; // backgroundColor of splashscreen
  display?: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
  orientation?:
    | 'any'
    | 'natural'
    | 'landscape'
    | 'landscape-primary'
    | 'landscape-secondary'
    | 'portrait'
    | 'portrait-primary'
    | 'portrait-secondary';
  scope?: string;
  theme_color?: string; // color of toolbar
  description?: string;
  dir?: 'ltr' | 'rtl' | 'auto'; // text-direction of name/short_name
  lang?: string; // language, e.g. "en-US"
  prefer_related_applications?: boolean;
  related_applications?: Array<{
    platform: string;
    url: string;
    id?: string;
  }>;
}

// read env
const { PORT } = getEnv();

const buildDir = join(process.cwd(), '.next');
const serverSrc = join(__dirname, '../server.js');
const serverDist = join(buildDir, 'server.js');

export const build = () => {
  copyFiles(buildDir, serverSrc, serverDist);
  execSync(`next build`, { stdio: 'inherit' });
};

export const dev = ({ '--dev': dev = true, '--port': port = PORT || 3000 }) =>
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

export const exportStatic = () => {
  copyFiles(buildDir, serverSrc, serverDist);
  execSync(`next export`, { stdio: 'inherit' });
};

export const start = ({
  '--dev': dev = false,
  '--port': port = PORT || 3000
}) =>
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

export const up = ({ '--latest': latest = true }: { '--latest'?: boolean }) =>
  execSync(
    latest ? 'yarn upgrade-interactive --latest' : 'yarn upgrade-interactive',
    { stdio: 'inherit' }
  );
