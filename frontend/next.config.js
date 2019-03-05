const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

module.exports = withBundleAnalyzer({
  target: 'serverless',

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
