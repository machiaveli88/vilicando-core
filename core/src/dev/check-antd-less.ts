// @ts-ignore
import lessToJs from 'less-vars-to-js';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { difference } from 'lodash';

const antd = require.resolve('antd');
const lessPath = join(antd, '../../lib/style/themes/default.less');
const themePath = join(__dirname, '../../src/theme/theme.json');

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

  writeFileSync(themePath, JSON.stringify(Object.assign(theme, differences)));

  console.log('theme updated with following vars:', differences);
}
