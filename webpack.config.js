const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpckPlugin = require('html-webpack-plugin');
const { Plugin } = require('webpack');
module.exports = {
    mode: 'none',
    output: {
      filename: 'main.js',
    libraryTarget: "umd",
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    module: {
        rules: [
          {
            test: /\.html$/i,
            loader: "html-loader",
          },
        ],
      },
    
    plugins: [
            new HtmlWebpackPlugin({ template: './src/index.html'})
        ]
    
  };
  