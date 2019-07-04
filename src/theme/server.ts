const withLess = require('@zeit/next-less');
const theme = require('./theme');

export default (modifyVars: object) =>
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: {
        ...theme,
        ...modifyVars
      }
    },
    webpack: (config: any, { isServer }: { isServer: boolean }) => {
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

      return config;
    }
  });
