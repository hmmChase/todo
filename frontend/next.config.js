// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://github.com/vercel/next.js/blob/canary/packages/next/next-server/server/config.ts#L12-L63

// import 'dotenv/config';
// require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');

const nextConfig = {
  // Deployment target
  target: 'serverless',

  // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
  webpack: (config, _options) => {
    config.plugins = config.plugins || [];

    // Without this, debugging breakpoints in handlers don't work,
    // only in render() or return() in functional components.
    // https://webpack.js.org/configuration/devtool/
    config.devtool =
      process.env.NODE_ENV === 'production'
        ? config.devtool
        : 'eval-source-map';

    // Fixes npm packages that depend on `fs` module
    config.node = { fs: 'empty' };

    // https://github.com/vercel/next.js/tree/canary/examples/with-dotenv
    config.plugins.push(
      // Read the .env file
      new Dotenv({ path: path.join(__dirname, '.env'), systemvars: true })
    );

    return config;
  },
};

module.exports = nextConfig;
