#!/usr/bin/env node
// @ts-ignore todo: remove
import withLess from '@zeit/next-less';
import overwrite from '../overwrite.json';
import { flattenObject } from '../utils';
import { theme as defaultTheme } from 'vilicando-core';
import { merge } from 'lodash';

const manipulateObj = (
  theme: object,
  overwrite: object,
  antdKey: string,
  originKey: string
) => {
  theme[antdKey] =
    overwrite[originKey] ||
    overwrite[antdKey] ||
    theme[originKey] ||
    theme[antdKey];

  if (theme[originKey]) delete theme[originKey];
  if (overwrite[originKey]) delete overwrite[originKey];
};

module.exports = (modifyVars: any = {}, nextConfig: any) => {
  if (!nextConfig) {
    if (modifyVars.webpack) {
      nextConfig = { ...modifyVars };
      modifyVars = {};
    } else {
      nextConfig = {};
    }
  }

  const { lessLoaderOptions, webpack, ...rest } = nextConfig;
  // see also in AntdProvider!
  const theme = flattenObject(merge(defaultTheme, overwrite));
  const _modifyVars = flattenObject(modifyVars);
  manipulateObj(theme, _modifyVars, 'padding-xs', 'spacing-xs');
  manipulateObj(theme, _modifyVars, 'padding-sm', 'spacing-sm');
  manipulateObj(theme, _modifyVars, 'padding-md', 'spacing-md');
  manipulateObj(theme, _modifyVars, 'padding-lg', 'spacing-lg');
  manipulateObj(theme, _modifyVars, 'font-size-base', 'font-size-md');
  manipulateObj(theme, _modifyVars, 'primary-color', 'primary-base');
  modifyVars = { ...theme, ..._modifyVars };

  // add 'px' to numbers, except of line-heights
  Object.keys(modifyVars).forEach(key => {
    if (
      typeof modifyVars[key] === 'number' &&
      !(key.indexOf('line-height') === 0 || ~key.indexOf('-line-height'))
    )
      modifyVars[key] = modifyVars[key] + 'px';
  });

  return withLess({
    extractCssChunksOptions: { orderWarning: false },
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars,
      ...lessLoaderOptions
    },
    webpack: (config: any, options: any) => {
      const { isServer } = options;

      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context: any, request: any, callback: any) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals)
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader'
        });
      }

      if (typeof webpack === 'function') {
        return webpack(config, options);
      }

      return config;
    },
    ...rest
  });
};
