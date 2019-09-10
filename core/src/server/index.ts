const withOffline = require('next-offline');
const withTheme = require('./with-theme');
const fs = require('fs');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');

interface IWithCore {
  theme: object;
  env?: string;
}

module.exports = ({ theme, env }: IWithCore, nextConfig: any = {}) => {
  const { webpack, dir, ...rest } = nextConfig;

  // use env-file, default is ./.env && ../.env
  const parsed = env
    ? require('dotenv').config({ path: env }).parsed
    : {
        ...require('dotenv').config({
          path: path.join(process.cwd(), '.env')
        }).parsed,
        ...require('dotenv').config({
          path: path.join(process.cwd(), '../.env')
        }).parsed
      };

  return withTheme(
    theme,
    withOffline({
      webpack(config: any, options: any) {
        const dirname = dir || process.cwd();

        config.resolve.alias['@assets'] = path.join(dirname, 'assets/');
        config.resolve.alias['@components'] = path.join(dirname, 'components/');
        config.resolve.alias['@data'] = path.join(dirname, 'data/');
        config.resolve.alias['@forms'] = path.join(dirname, 'forms/');
        config.resolve.alias['@language'] = path.join(dirname, 'language/');
        config.resolve.alias['@pages'] = path.join(dirname, 'pages/');
        config.resolve.alias['@utils'] = path.join(dirname, 'utils/');

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
