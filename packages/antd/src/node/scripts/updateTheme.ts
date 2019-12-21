// @ts-ignore
import lessToJs from 'less-vars-to-js';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { difference } from 'lodash';
import { parseTheme } from '../../utils';

const antd = require.resolve('antd');
const lessPath = join(antd, '../../lib/style/themes/default.less');
const colorsPath = join(antd, '../../lib/style/color/colors.less');
const themePath = join(__dirname, '../../../src/theme.json');
const typesPath = join(__dirname, '../../../src/types.ts');

const getNestedTypes = (theme: object | number | string) => {
  let types = '';

  Object.keys(theme).forEach(
    key =>
      (types +=
        typeof theme[key] === 'object'
          ? `${key}: { ${getNestedTypes(theme[key])} },`
          : `${key}: ${
              typeof theme[key] === 'number' ? 'number | string' : 'string'
            };`)
  );

  return types;
};

if (existsSync(lessPath)) {
  const lessFile = readFileSync(lessPath, 'utf8');
  let less = lessToJs(lessFile, {
    stripPrefix: true
  });

  const colorsFile = readFileSync(colorsPath, 'utf8');
  const colors = lessToJs(colorsFile, {
    stripPrefix: true
  });
  less = Object.assign(less, colors);

  const themeFile = readFileSync(themePath, 'utf8');
  const theme = JSON.parse(themeFile);

  const differences = {};
  const differenceKeys = difference(Object.keys(less), Object.keys(theme));
  differenceKeys.forEach(d => (differences[d] = less[d]));

  const missed = {};
  const missedKeys = difference(Object.keys(theme), Object.keys(less));
  missedKeys.forEach(d => (missed[d] = theme[d]));

  const sortedTheme = {};
  const mergedTheme = Object.assign(theme, differences);
  Object.keys(mergedTheme)
    .sort()
    .forEach(key => (sortedTheme[key] = mergedTheme[key]));

  writeFileSync(themePath, JSON.stringify(sortedTheme));

  const parsedTheme = parseTheme(sortedTheme);
  let types = `export interface IAntdTheme {${getNestedTypes(parsedTheme)}}`;
  writeFileSync(typesPath, types);

  console.info('theme updated with following vars:', differences);
  console.info('theme has following non-antd-vars:', missed);
}
