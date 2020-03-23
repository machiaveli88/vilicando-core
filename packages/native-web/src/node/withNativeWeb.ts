#!/usr/bin/env node

module.exports = (nextConfig: any = {}) => {
  const { webpack, ...rest } = nextConfig;

  return {
    webpack: (config: any, options: any) => {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        // Transform all direct `react-native` imports to `react-native-web`
        'react-native$': 'react-native-web'
      };
      config.resolve.extensions = [
        '.web.js',
        '.web.ts',
        '.web.tsx',
        ...config.resolve.extensions
      ];

      if (typeof webpack === 'function') {
        return webpack(config, options);
      }

      return config;
    },
    ...rest
  };
};
