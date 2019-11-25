const withOffline = require('next-offline');
const { config } = require('dotenv');
const { join } = require('path');
const { EnvironmentPlugin } = require('webpack');

interface IWithCore {
  env?: string;
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

  const { env, aliases = ['components', 'pages'] } = props;
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

  return withOffline({
    webpack(config: any, options: any) {
      const dirname = dir || process.cwd();

      aliases.forEach((alias: string) => {
        config.resolve.alias[`@${alias}`] = join(dirname, `${alias}/`);
      });

      config.plugins.push(new EnvironmentPlugin(parsed));

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
