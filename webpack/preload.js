const path = require('path');

module.exports = {
    context: path.join(__dirname, '../src'),
    devtool: false,
    entry: './preload.js',
    output: {
        path: path.join(__dirname, '../', 'build'),
        filename: 'preload.js',
    },

    target: 'electron-renderer',

    resolve: {
        alias: {},
    },

    node: {
        fs: 'empty',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                // loader: "ts-loader"
                loader: 'babel-loader',
                options: {
                    plugins: ['transform-class-properties'],
                    cacheDirectory: true,
                },
            },
        ],
    },
};
