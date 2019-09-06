require('dotenv').config();

// @ts-ignore
import Dotenv from 'dotenv-webpack';
import path from 'path';
// @ts-ignore
import withOffline from 'next-offline';
import withTheme from '../theme/server';

// todo: dotenv-webpack entfernen und env in Objekt zurückgeben https://github.com/zeit/next.js/blob/canary/examples/with-env-from-next-config-js/next.config.js

interface IWithCore {
  theme: object;
  env: string;
}

export default ({ theme, env }: IWithCore, nextConfig: any = {}) => {
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
      dir,
      ...rest
    })
  );
};
