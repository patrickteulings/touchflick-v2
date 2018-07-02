const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const config = {
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './'),
        port: 3000,
        host: 'localhost',
        hot: false,
        inline: true
    },
    entry: {
        main: [
            './src/js/script.js',
            './src/scss/style.scss'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader',
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './app.css'
        })
    ]
};

module.exports = config;