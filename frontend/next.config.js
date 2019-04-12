require('dotenv').config();
const Dotenv = require('dotenv-webpack');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const path = require('path');

module.exports = withBundleAnalyzer({
  target: 'serverless',
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // https://github.com/zeit/next.js/tree/canary/examples/with-dotenv
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ];

    return config;
  },

  // https://github.com/zeit/next-plugins/tree/master/packages/next-bundle-analyzer
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
