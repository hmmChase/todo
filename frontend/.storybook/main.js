module.exports = {
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
  ]
};
