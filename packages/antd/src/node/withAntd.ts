#!/usr/bin/env node
// @ts-ignore todo: remove
import withLess from '@zeit/next-less';
import overwrite from '../overwrite.json';

const flattenObject = (obj: object, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '-' : '';

    if (typeof obj[k] === 'object')
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[(pre + k).replace(/([A-Z])/g, '-$1').toLowerCase()] = obj[k];

    return acc;
  }, {});

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

  return withLess({
    extractCssChunksOptions: { orderWarning: false },
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: flattenObject({
        ...overwrite,
        ...modifyVars
      }),
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
