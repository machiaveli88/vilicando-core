#!/usr/bin/env node
// @ts-ignore todo: remove
import withLess from '@zeit/next-less';
import overwrite from '../overwrite.json';
import { flattenObject } from '../utils';
import { theme as baseTheme } from 'vilicando-core';
import { merge } from 'lodash';
// @ts-ignore todo: remove
import FilterWarningsPlugin from 'webpack-filter-warnings-plugin';

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
  const theme = flattenObject(
    merge(
      {},
      baseTheme,
      {
        shadow: {
          '1': {
            down: baseTheme.shadow[1],
            left: baseTheme.shadow[1],
            right: baseTheme.shadow[1],
            up: baseTheme.shadow[1]
          }
        }
      },
      overwrite
    )
  );
  const _modifyVars = flattenObject(modifyVars);

  manipulateObj(theme, _modifyVars, 'padding-xs', 'spacing-xs');
  manipulateObj(theme, _modifyVars, 'padding-sm', 'spacing-sm');
  manipulateObj(theme, _modifyVars, 'padding-md', 'spacing-md');
  manipulateObj(theme, _modifyVars, 'padding-lg', 'spacing-lg');
  manipulateObj(theme, _modifyVars, 'font-size-base', 'font-size-md');
  manipulateObj(theme, _modifyVars, 'primary-color', 'primary-base');
  modifyVars = { ...theme, ..._modifyVars };

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

      config.plugins.push(
        new FilterWarningsPlugin({
          exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
        })
      );

      if (typeof webpack === 'function') {
        return webpack(config, options);
      }

      return config;
    },
    ...rest
  });
};
