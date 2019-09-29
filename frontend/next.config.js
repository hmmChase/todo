const fs = require('fs');
const path = require('path');
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const withOffline = require('next-offline');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './styles/antd-custom.less'), 'utf8')
);

// https://github.com/hanford/next-offline#now-20
const nextConfig = {
  // custom webpack config for Ant Design Less
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables // make your antd custom effective
  },
  // NOTE: this is present in the example, but breaks on dev
  // target: "serverless",
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  generateInDevMode: false,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  },

  webpack: (config, options) => {
    // https://github.com/zeit/next.js/tree/canary/examples/with-ant-design-less
    if (options.isServer) {
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

module.exports = withOffline(withLess(nextConfig));
