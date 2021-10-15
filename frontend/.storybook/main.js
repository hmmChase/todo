module.exports = {
  stories: ['../src/components/**/*.stories.js'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',

    // https://storybook.js.org/addons/storybook-addon-next-router
    'storybook-addon-next-router'
  ]
};
