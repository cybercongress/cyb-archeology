const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function getPlugins(isProduction) {
    const plugins = [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: 'CYB - The web3 browser',
            template: path.resolve(__dirname, '../', 'public', 'index.html'),
            favicon: path.resolve(__dirname, '../', 'public', 'favicon.ico'),
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            openAnalyzer: false,
        }),
        new CopyWebpackPlugin([
            // Copy directory contents to {output}/
            { from: '../public/electron.js' },
            { from: '../public/favicon.ico' },
            { from: '../public/manifest.json' },
        ]),
    ];

    if (!isProduction) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return plugins;
}

module.exports = (env = {}, argv = {}) => {
    const ENV = argv.mode || 'development';
    const isProduction = ENV === 'production';
    const SOURCE_MAP = env.SOURCE_MAP || '';

    return {
        context: path.join(__dirname, '../', 'src'),
        entry: {
            main: path.join(__dirname, '../', 'src', 'index.js'),
        },
        output: {
            path: path.join(__dirname, '../', 'build'),
            filename: '[name].bundle.[hash:10].js',
            publicPath: './',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: 'babel-loader' },
                        {
                            loader: 'eslint-loader',
                            options: {
                                emitWarning: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.less$/,
                    use: [
                        { loader: 'style-loader' },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]_[local]',
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpg|svg|woff|woff2|ttf|eot|otf)(\?.*)?$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:10].[ext]',
                            outputPath: '',
                            publicPath: '',
                            useRelativePath: false,
                        },
                    },
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx'],
            alias: {},
        },
        devtool: SOURCE_MAP,
        plugins: getPlugins(isProduction),
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        devServer: {
            contentBase: './build',
            port: 3000,
            hot: true,
        },
    };
};
