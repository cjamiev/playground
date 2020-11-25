const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  process.env.NODE_ENV = 'development';

  return {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: "./build",
      historyApiFallback: true,
      inline: true,
      port: 3000,
      open: true
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.html$/,
          use: [
            'html-loader'
          ]
        },
        {
          test: /\.(svg|png|jpg|gif)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve('./src/index.html')
      }),
      new webpack.DefinePlugin({ 'process.env': JSON.stringify(env) })
    ]
  };
};

