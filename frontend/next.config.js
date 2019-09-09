/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
// https://nextjs.org/docs#customizing-webpack-config

const path = require('path');
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const DotenvWebpackPlugin = require('dotenv-webpack');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

const nextConfig = {
  target: 'serverless',

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins = config.plugins || [];

    // https://github.com/zeit/next.js/tree/canary/examples/with-dotenv
    config.plugins.push(
      new DotenvWebpackPlugin({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    );

    // https://github.com/zeit/next.js/tree/canary/examples/with-ant-design
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];

      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ];

      config.module.rules.unshift({ test: antStyles, use: 'null-loader' });
    }

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
};

module.exports = withPlugins([withCSS, withBundleAnalyzer], nextConfig);
