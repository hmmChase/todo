// require('dotenv').config();
// import 'dotenv/config';

const Dotenv = require('dotenv-webpack');
const path = require('path');

const nextConfig = {
  target: 'serverless',

  webpack: (config, _options) => {
    config.plugins = config.plugins || [];

    // Without this debug breakpoints in handlers don't work,
    // only in render() or return() in functional components.
    // https://webpack.js.org/configuration/devtool/
    // config.devtool = 'eval-source-map';

    // Zeit Now: Fixes npm packages that depend on `fs` module
    config.node = { fs: 'empty' };

    // Read the .env file
    config.plugins.push(
      new Dotenv({ path: path.join(__dirname, '.env'), systemvars: true })
    );

    return config;
  },
};

module.exports = nextConfig;
