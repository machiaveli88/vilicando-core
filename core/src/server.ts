require('dotenv').config();

const Dotenv = require('dotenv-webpack');
const path = require('path');
const withOffline = require('next-offline');
const withTheme = require('./theme/server');

interface IWithCore {
  theme: object;
  env: string;
}

module.exports = ({ theme, env }: IWithCore, nextConfig: any = {}) => {
  const { webpack, dir, ...rest } = nextConfig;

  return withTheme(
    theme,
    withOffline({
      webpack(config: any, options: any) {
        const dirname = dir || __dirname;

        config.resolve.alias['@assets'] = path.join(dirname, 'assets/');
        config.resolve.alias['@components'] = path.join(dirname, 'components/');
        config.resolve.alias['@data'] = path.join(dirname, 'data/');
        config.resolve.alias['@forms'] = path.join(dirname, 'forms/');
        config.resolve.alias['@language'] = path.join(dirname, 'language/');
        config.resolve.alias['@pages'] = path.join(dirname, 'pages/');
        config.resolve.alias['@utils'] = path.join(dirname, 'utils/');

        if (env)
          config.plugins = [
            ...(config.plugins || []),

            // Read the .env file
            new Dotenv({
              path: env,
              systemvars: true
            })
          ];

        if (typeof webpack === 'function') {
          return webpack(config, options);
        }

        return config;
      },
      target: 'serverless',
      transformManifest: (manifest: string) => ['/'].concat(manifest), // add the homepage to the cache
      workboxOpts: {
        swDest: 'static/service-worker.js',
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'https-calls',
              networkTimeoutSeconds: 15,
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      dir,
      ...rest
    })
  );
};
