#!/usr/bin/env node
import { join } from 'path';
import { generateImages } from 'pwa-asset-generator';
import { existsSync, readFileSync, writeFileSync, readdirSync } from 'fs';

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

const publicDir = join(process.cwd(), 'public');
const manifestPath = join(publicDir, 'manifest.json');
const configPath = join(process.cwd(), 'config.json');

export const pwa = async () => {
  const config =
    existsSync(configPath) &&
    (JSON.parse(readFileSync(configPath, 'utf8')) || {});

  if (config) {
    const { name, shortName, description, logo, theme } = config;
    const logoName =
      (existsSync(join(publicDir, logo)) && logo) || // logo-name/path is given in config...
      (existsSync(publicDir) &&
        readdirSync(publicDir).find(name => name.split('.')?.[0] === 'logo')); // ...or search for logo in public-dir

    if (logoName) {
      const logoPath = join(publicDir, logoName);

      // manifest generieren
      let data: IManifest = {};
      if (existsSync(manifestPath))
        data = JSON.parse(readFileSync(manifestPath, 'utf8')) || {};
      data = {
        ...data,
        name: data.name || name,
        short_name: data.short_name || shortName,
        description: data.description || description,
        display: data.display || 'standalone',
        background_color: data.background_color || theme.primary.base,
        theme_color: data.background_color || theme.primary.base
      };
      writeFileSync(manifestPath, JSON.stringify(data), 'utf8');
      console.info('  ✔ manifest.json created!');

      // pwas generieren
      /* const { htmlMeta } = */ await generateImages(
        logoPath,
        join(publicDir, 'images'),
        {
          background: data.background_color,
          opaque: false,
          scrape: false,
          manifest: manifestPath,
          favicon: true,
          log: false
        }
      );

      // todo: safari-pinned-tab.svg generieren
      // nur strokes, diese schwarz, 16x16 Pixel!
      /* if (logoName.split('.').reverse()?.[0] === 'svg') {
      writeFileSync(
        join(publicDir, 'images/safari-pinned-tab.svg'),
        readFileSync(logoPath, 'utf8').replace(
          /<svg [^\>]*>/g,
          '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16px" height="16px">'
        ),
        'utf8'
      );
      console.info('  ✔ safari-pinned-tab.svg generated!');
    } else
      console.info(
        '  ✘ logo has to be .svg, to create automatically safari-pinned-tab.svg!'
      ); */

      // todo:
      // htmlMeta in Head schreiben!
      // logoName variabel machen
      // background variabel machen
      // name/short-name variabel machen
      // Idee: Skript wird automatisch aufgerufen, schaut ob ein Logo vorhanden ist, wenn ja schaut es ob alle icons + manifest vorhanden sind, wenn nein wird Skript ausgeführt (ansonsten nur wenn explizit aufgerufen!!!)!

      console.info('  ✔ pwa-assets generated!');
    } else console.info('  ✘ no logo found!');
  } else console.info('  ✘ no config.json found!');
};
