import type { StorybookConfig } from '@storybook/nextjs';
// import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  staticDirs: ['../public'],

  framework: { name: '@storybook/nextjs', options: {} },

  core: { disableTelemetry: true },

  docs: { autodocs: 'tag' },

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',

    // https://storybook.js.org/docs/react/writing-tests/interaction-testing
    '@storybook/addon-interactions'

    // https://storybook.js.org/addons/@storybook/addon-a11y
    // '@storybook/addon-a11y'.

    // https://storybook.js.org/addons/storybook-addon-apollo-client
    // 'storybook-addon-apollo-client',
  ],

  // https://storybook.js.org/docs/react/configure/typescript
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
    }
  }

  // webpackFinal: async config => {
  //   // https://github.com/storybookjs/storybook/issues/11639
  //   // config.resolve.modules = [path.resolve(__dirname), 'node_modules'];

  //   config.resolve.alias = {
  //     ...config.resolve.alias,

  //     '@/components': path.resolve(__dirname, '../src/components'),
  //     '@/constants': path.resolve(__dirname, '../src/constants'),
  //     '@/context': path.resolve(__dirname, '../src/context'),
  //     '@/graphql': path.resolve(__dirname, '../src/graphql'),
  //     '@/hooks': path.resolve(__dirname, '../src/hooks'),
  //     '@/mocks': path.resolve(__dirname, '../src/mocks'),
  //     '@/models': path.resolve(__dirname, '../src/models'),
  //     '@/pages': path.resolve(__dirname, '../src/pages'),
  //     '@/public': path.resolve(__dirname, '../public'),
  //     '@/root': path.resolve(__dirname, '../'),
  //     '@/styles': path.resolve(__dirname, '../src/styles'),
  //     '@/utils': path.resolve(__dirname, '../src/utils')
  //   };

  //   return config;
  // }
};

export default config;
