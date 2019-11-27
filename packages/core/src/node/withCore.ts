#!/usr/bin/env node
// @ts-ignore todo: remove
import withOffline from 'next-offline';
import { join } from 'path';
import { EnvironmentPlugin } from 'webpack';
import { getEnv } from './env';

interface IWithCore {
  aliases?: Array<string>;
}

module.exports = (props: IWithCore | any = {}, nextConfig: any) => {
  if (!nextConfig) {
    if (props.webpack) {
      nextConfig = { ...props };
      props = {};
    } else {
      nextConfig = {};
    }
  }

  const { aliases = ['components', 'pages'] } = props;
  const { webpack, dir, ...rest } = nextConfig;

  return withOffline({
    webpack(config: any, options: any) {
      const dirname = dir || process.cwd();

      aliases.forEach((alias: string) => {
        config.resolve.alias[`@${alias}`] = join(dirname, `${alias}/`);
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
