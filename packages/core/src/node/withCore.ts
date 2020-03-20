#!/usr/bin/env node
// @ts-ignore
import withOffline from 'next-offline';
import { join } from 'path';
import { EnvironmentPlugin } from 'webpack';
import { getEnv } from './utils';

interface IWithCore {
  aliases?: Array<string>;
}

module.exports = (props: IWithCore | any = {}, nextConfig: any) => {
  const {
    aliases = ['components', 'pages', 'theme', 'translation'],
    ..._props
  } = props;
  const { webpack, dir, ...rest } = nextConfig || { ..._props };

  return withOffline({
    webpack(config: any, options: any) {
      const dirname = dir || process.cwd();

      aliases.forEach((alias: string) => {
        config.resolve.alias[`@${alias}`] = join(dirname, `${alias}`);
      });

      config.plugins.push(new EnvironmentPlugin(getEnv()));

      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
      });

      if (typeof webpack === 'function') {
        return webpack(config, options);
      }

      return config;
    },
    dir,
    ...rest
  });
};
