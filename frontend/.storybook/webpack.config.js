const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');

const themeVars = lessToJs(
  fs.readFileSync(
    path.resolve(__dirname, '../public/styles/antd-custom.less'),
    'utf8'
  )
);

module.exports = ({ config }) => {
  config.module.rules.push({
    loader: 'babel-loader',
    exclude: /node_modules/,
    test: /\.(js|jsx)$/,
    options: {
      presets: ['@babel/react'],
      plugins: [
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
      ]
    }
  });

  config.module.rules.push({
    test: /\.less$/,
    loaders: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader',
        options: { javascriptEnabled: true, modifyVars: themeVars }
      }
    ]
  });

  return config;
};
