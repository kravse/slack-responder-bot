'use strict';

const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = (env = {}) => {

  const config = {
    entry: ['./src/main.ts'], // Let's change our entry file's extension to '.ts'
    mode: env.development ? 'development' : 'production',
    target: 'node',
    devtool: env.development ? 'cheap-eval-source-map' : false,
    resolve: {
      extensions: ['.ts', '.js'], // We need to watch '.ts' files as well as '.js' files
      modules: ['node_modules', 'src', 'package.json']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [],
  };

  if (env.nodemon) {
    config.watch = true;
    config.plugins.push(new NodemonPlugin());
  }

  return config;
};