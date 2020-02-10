// module.exports = ({ config }) => {
//   config.module.rules.push({
//     test: /\.(ts|tsx)$/,
//     loader: require.resolve('babel-loader'),
//     options: {
//       presets: [require.resolve('babel-preset-react-app')]
//     }
//   });

//   config.resolve.extensions.push('.ts', '.tsx');
//   return config;
// };

// const path = require('path');

// module.exports = (baseConfig, env, defaultConfig) => {
//   // Extend defaultConfig as you need.
//   defaultConfig.module.rules.push({
//     test: /\.less$/,
//     loaders: [
//       'style-loader',
//       'css-loader',
//       {
//         loader: 'less-loader',
//         options: { javascriptEnabled: true }
//       }
//     ],
//     include: path.resolve(__dirname, '../src/')
//   });
//   return defaultConfig;
// };

const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/,
        options: {
          presets: ['@babel/react'],
          plugins: [['import', { libraryName: 'antd', style: true }]]
        }
      },

      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',

            options: {
              modifyVars: { '@primary-color': '#d8df19' },
              javascriptEnabled: true
            }
          }
        ],
        include: path.resolve(__dirname, '../')
      }
    ]
  }
};
