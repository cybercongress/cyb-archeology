const path = require("path");
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env = {}, argv = {}) => {

    const ENV = argv.mode || 'development';
    const isProduction = ENV === 'production';
    const SOURCE_MAP = env.SOURCE_MAP || ''; // "eval-source-map"; // "source-map"

    console.log(env, argv);
    console.log(' -------------> PROD = ', ENV, isProduction);

    return {
        entry: path.join(__dirname, '../', 'src', 'index.js'),
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'eslint-loader']
                },
                {
                    test: /\.less$/,
                    use: [
                        {loader: 'style-loader'},
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: "[name]_[local]"
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
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
            path: path.join(__dirname, '../', 'build'),
            filename: '[name].bundle.[hash:10].js',
            publicPath: '/'
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
                        chunks: 'all'
                    }
                }
            }
        },
        devServer: {
            contentBase: './build',
            port: 3000,
            hot: true
        }
    }
};

function getPlugins(isProduction) {
    const plugins = [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: "CYB - The web3 browser",
            template: path.resolve(__dirname, "../", "public", "index.html")
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: isProduction ? 'disabled' : 'server',
            openAnalyzer: false
        })
    ];

    if (isProduction) {
        plugins.push(
            new UglifyJsPlugin({
                test: /\.js($|\?)/i
            })
        )
    } else {
        plugins.push(new webpack.HotModuleReplacementPlugin())
    }

    return plugins
}
