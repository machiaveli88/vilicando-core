const withOffline = require('next-offline');
const withTheme = require('./with-theme');
const fs = require('fs');
const { config } = require('dotenv');
const { join } = require('path');
const { EnvironmentPlugin } = require('webpack');

interface IWithCore {
  theme?: object;
  env?: string;
}

module.exports = (props: IWithCore, nextConfig: any = {}) => {
  const { theme, env } = props || {};
  const { webpack, dir, ...rest } = nextConfig;

  // use env-file, default is ./.env && ../.env
  const parsed = env
    ? config({ path: env }).parsed
    : {
        ...config({
          path: join(process.cwd(), '.env')
        }).parsed,
        ...config({
          path: join(process.cwd(), '../.env')
        }).parsed
      };

  return withTheme(
    theme || {},
    withOffline({
      webpack(config: any, options: any) {
        const dirname = dir || process.cwd();

        config.resolve.alias['@assets'] = join(dirname, 'assets/');
        config.resolve.alias['@components'] = join(dirname, 'components/');
        config.resolve.alias['@data'] = join(dirname, 'data/');
        config.resolve.alias['@forms'] = join(dirname, 'forms/');
        config.resolve.alias['@language'] = join(dirname, 'language/');
        config.resolve.alias['@pages'] = join(dirname, 'pages/');
        config.resolve.alias['@typings'] = join(dirname, 'typings/');
        config.resolve.alias['@utils'] = join(dirname, 'utils/');

        config.plugins.push(new EnvironmentPlugin(parsed));

        if (typeof webpack === 'function') {
          return webpack(config, options);
        }

        return config;
      },
      dir,
      ...rest
    })
  );
};
