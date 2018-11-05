const path = require("path");
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (options = {}) {

    const ENV = process.env.NODE_ENV || 'development';
    const isProduction = ENV === 'production';
    const SOURCE_MAP = options.SOURCE_MAP || "eval"; // "eval-source-map"; // "source-map"

    return {
        entry: './src/index.js',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|svg|woff|woff2|ttf|eot|otf)(\?.*)?$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:10].[ext]',
                            outputPath: '',
                            publicPath: '',
                            useRelativePath: false
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
        output: {
            path: __dirname + '/build',
            filename: '[name].bundle.js',
            publicPath: '/'
        },
        devtool: SOURCE_MAP,
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                title: "CYB - The web3 browser",
                template: path.resolve(__dirname, "public", "index.html")
            })
        ],
        devServer: {
            contentBase: './build',
            port: 3000,
            hot: true
        }
    }
};
