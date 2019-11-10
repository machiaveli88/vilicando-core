// @ts-ignore
import lessToJs from 'less-vars-to-js';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { difference } from 'lodash';
import { parseTheme, replaceLessVars } from '../theme/ThemeProvider';

const antd = require.resolve('antd');
const lessPath = join(antd, '../../lib/style/themes/default.less');
const themePath = join(__dirname, '../../src/theme/theme.json');
const typesPath = join(__dirname, '../../src/theme/types.ts');

if (existsSync(lessPath)) {
  const lessFile = readFileSync(lessPath, 'utf8');
  const less = lessToJs(lessFile, {
    stripPrefix: true
  });

  const themeFile = readFileSync(themePath, 'utf8');
  const theme = JSON.parse(themeFile);

  const differences = {};
  const differenceKeys = difference(Object.keys(less), Object.keys(theme));
  differenceKeys.forEach(d => (differences[d] = less[d]));

  const sortedTheme = {};
  const mergedTheme = Object.assign(theme, differences);
  Object.keys(mergedTheme)
    .sort()
    .forEach(key => (sortedTheme[key] = mergedTheme[key]));

  writeFileSync(themePath, JSON.stringify(sortedTheme));

  const parsedTheme = parseTheme(replaceLessVars(sortedTheme));
  let types = 'export interface ITheme {';
  Object.keys(parsedTheme).forEach(
    key =>
      (types += `
  ${key}: ${
        typeof parsedTheme[key] === 'number' ? 'number | string' : 'string'
      };`)
  );
  types += `
}`;

  writeFileSync(typesPath, types);

  console.log('theme updated with following vars:', differences);
}
