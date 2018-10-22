// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

const path = require('path');


module.exports = {
  context: path.join(__dirname, '../src'),
  devtool: false,
  entry: './preload.js',
  output: {
    path: path.join(__dirname, '../', 'build'),
    filename: 'preload.js'
  },

  target: 'electron-renderer',

  resolve: {
    alias: {}
  },

  node: {
    fs: 'empty'
  },

  module: {
    rules: [
      // rulesParity,
      // rulesEs6,
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // loader: "ts-loader"
        loader: 'babel-loader',
        options: {
            presets: ['es2015', 'stage-2', 'react'],
            plugins: ['transform-decorators-legacy', 'transform-class-properties'],
            cacheDirectory: true,
        },
      }
    ]
  }
  //, plugins: Shared.getPlugins()
};
