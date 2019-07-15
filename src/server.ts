import path from 'path';
import withTheme from './theme/server';

export const withCore = (theme: object, nextConfig: any = {}) => {
  const { webpack, dir, ...rest } = nextConfig;

  console.log(dir);

  return withTheme(theme, {
    webpack(config: any, options: any) {
      const dirname = dir || __dirname;

      config.resolve.alias['@assets'] = path.join(dirname, 'assets');
      config.resolve.alias['@components'] = path.join(dirname, 'components');
      config.resolve.alias['@data'] = path.join(dirname, 'data');
      config.resolve.alias['@forms'] = path.join(dirname, 'forms');
      config.resolve.alias['@pages'] = path.join(dirname, 'pages');
      config.resolve.alias['@utils'] = path.join(dirname, 'utils');

      // waiting for PR https://github.com/zeit/next.js/pull/7550
      config.stats = {};
      config.stats.warnings = false;
      config.stats.warningsFilter = (warning: string) => {
        console.log('it works?!');
        console.log('it works?!');
        console.log('it works?!');
        console.log('it works?!');
        console.log('it works?!');
        console.log('it works?!');
        return /Conflicting order between/gm.test(warning);
      };

      if (typeof webpack === 'function') {
        return webpack(config, options);
      }

      return config;
    },
    dir,
    ...rest
  });
};
