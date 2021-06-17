const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');

const themeVars = lessToJs(
  fs.readFileSync(
    path.resolve(__dirname, '../public/styles/antd-custom.less'),
    'utf8'
  )
);

module.exports = {
  stories: ['../components/**/*.stories.js'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    // '@storybook/addon-viewport',
    '@storybook/addon-backgrounds'
  ],

  webpackFinal: config => {
    // config.module.rules.push({
    //   loader: 'babel-loader',
    //   exclude: /node_modules/,
    //   test: /\.(js|jsx)$/,
    //   options: {
    //     // presets: ['@babel/preset-env', '@babel/preset-react'],
    //     // plugins: [['import', { libraryName: 'antd', style: true }]]
    //   }
    // });

    config.module.rules.push({
      test: /\.less$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        {
          loader: 'less-loader',
          options: { modifyVars: themeVars, javascriptEnabled: true }
        }
      ]
    });

    return config;
  }
};
