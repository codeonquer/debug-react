/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';

const babelForClient = {
  babelrc: false,
  sourceType: 'unambiguous',
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage',
        modules: false,
        targets: {
          browsers: ['iOS >= 13']
        }
      }
    ],
    '@babel/preset-react',
    '@babel/preset-flow'
  ]
};

const babelForServer = {
  babelrc: false,
  sourceType: 'unambiguous',
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        targets: {
          node: '14.15'
        }
      }
    ],
    '@babel/preset-react',
    '@babel/preset-flow'
  ]
};

rimraf.sync(path.resolve(__dirname, '../build'));
webpack(
  [
    {
      mode: isProduction ? 'production' : 'development',
      cache: false,
      devtool: false,
      entry: [path.resolve(__dirname, '../src/index.js')],
      output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'main.js',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: [
              {
                loader: 'babel-loader',
                options: babelForClient
              }
            ],
            exclude: /node_modules/,
          },
        ],
      },
    },
    {
      target: 'node14.15',
      externalsPresets: { node: true },
      externals: [nodeExternals()],
      mode: isProduction ? 'production' : 'development',
      cache: false,
      devtool: false,
      entry: [path.resolve(__dirname, '../server/render.js')],
      output: {
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, '../build'),
        filename: 'render.js',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: [
              {
                loader: 'babel-loader',
                options: babelForServer
              }
            ],
            exclude: /node_modules/,
          },
        ],
      },
    }
  ],
  (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      process.exit(1);
      return;
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.log('Finished running webpack with errors.');
      info.errors.forEach(e => console.error(e));
      process.exit(1);
    } else {
      console.log('Finished running webpack.');
    }
  }
);
