const withLess = require('@zeit/next-less');
const theme = require('../theme/theme.json');

function HACK_removeMinimizeOptionFromCssLoaders(config: any) {
  config.module.rules.forEach((rule: any) => {
    if (Array.isArray(rule.use)) {
      console.log('here i can remove that shitty css-warning!', rule);
      rule.use.forEach((u: any) => {
        if (u.loader === 'css-loader' && u.options) {
          console.warn(
            'HACK: Removing `minimize` option from `css-loader` entries in Webpack config'
          );
          delete u.options.minimize;
        }
      });
    }
  });
}

module.exports = (modifyVars: object, nextConfig: any = {}) => {
  const { lessLoaderOptions, webpack, ...rest } = nextConfig;

  return withLess({
    // todo: extractCssChunksOptions: { orderWarning: false }, // todo: waiting for PR https://github.com/zeit/next-plugins/pull/510
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: {
        ...theme,
        ...modifyVars
      },
      ...lessLoaderOptions
    },
    webpack: (config: any, options: any) => {
      const { isServer } = options;

      HACK_removeMinimizeOptionFromCssLoaders(config);

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
