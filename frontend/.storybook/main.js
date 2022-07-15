const path = require('path');

const main = {
  framework: '@storybook/react',

  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  staticDirs: ['../public'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',

    // https://storybook.js.org/addons/storybook-addon-next-router
    'storybook-addon-next-router'

    // https://storybook.js.org/addons/storybook-addon-apollo-client
    // 'storybook-addon-apollo-client',
  ],

  webpackFinal: async config => {
    // https://github.com/storybookjs/storybook/issues/11639
    config.resolve.modules = [path.resolve(__dirname), 'node_modules'];

    config.resolve.alias = {
      ...config.resolve.alias,

      '@/components': path.resolve(__dirname, '../src/components'),
      '@/constants': path.resolve(__dirname, '../src/constants'),
      '@/context': path.resolve(__dirname, '../src/context'),
      '@/graphql': path.resolve(__dirname, '../src/graphql'),
      '@/hooks': path.resolve(__dirname, '../src/hooks'),
      '@/models': path.resolve(__dirname, '../src/models'),
      '@/pages': path.resolve(__dirname, '../src/pages'),
      '@/public': path.resolve(__dirname, '../public'),
      '@/root': path.resolve(__dirname, '../'),
      '@/styles': path.resolve(__dirname, '../src/styles'),
      '@/utils': path.resolve(__dirname, '../src/utils')
    };

    return config;
  }
};

module.exports = main;
