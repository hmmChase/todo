// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://github.com/zeit/next.js/blob/canary/packages/next/next-server/server/config.ts#L12-L63

// require('dotenv').config();
// import 'dotenv/config';

const Dotenv = require('dotenv-webpack');
const path = require('path');

const nextConfig = {
  // Now by ZEIT deployment target
  target: 'serverless',

  // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
  webpack: (config, _options) => {
    config.plugins = config.plugins || [];

    // Without this debug breakpoints in handlers don't work,
    // only in render() or return() in functional components.
    // https://webpack.js.org/configuration/devtool/
    config.devtool =
      process.env.NODE_ENV === 'production'
        ? config.devtool
        : 'eval-source-map';

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
