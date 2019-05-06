/* eslint-disable no-param-reassign */
const path = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

module.exports = withBundleAnalyzer({
  target: 'serverless',

  webpack: config => {
    config.plugins = [
      ...(config.plugins || []),

      // https://github.com/zeit/next.js/tree/canary/examples/with-dotenv
      new DotenvWebpackPlugin({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ];

    return config;
  },

  // github.com/zeit/next-plugins/tree/master/packages/next-bundle-analyzer
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  }
});
