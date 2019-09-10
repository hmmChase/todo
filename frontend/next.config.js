/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */

// https://nextjs.org/docs#customizing-webpack-config

const fs = require('fs');
const path = require('path');
const withPlugins = require('next-compose-plugins');
const DotenvWebpackPlugin = require('dotenv-webpack');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './styles/antd-custom.less'), 'utf8')
);

const nextConfig = {
  target: 'serverless',

  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables // make your antd custom effective
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
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins = config.plugins || [];

    // https://github.com/zeit/next.js/tree/canary/examples/with-dotenv
    config.plugins.push(
      new DotenvWebpackPlugin({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    );

    // https://github.com/zeit/next.js/blob/canary/examples/with-ant-design-less/next.config.js
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
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

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      });
    }

    return config;
  }
};

module.exports = withPlugins(
  [withCSS, withLess, withBundleAnalyzer],
  nextConfig
);
