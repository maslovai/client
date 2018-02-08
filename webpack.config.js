'use strict';

require('dotenv').config();

// Dynamic Script and Style Tags
const HTMLPlugin = require('html-webpack-plugin');

// Makes a separate CSS bundle
const ExtractPlugin = require('extract-text-webpack-plugin');

const {EnvironmentPlugin, DefinePlugin} = require('webpack');

let production = process.env.NODE_ENV === "production";

let plugins = [
    new HTMLPlugin({
        template: `${__dirname}/src/index.html`
    }),
    new ExtractPlugin('bundle.[hash].css'),
    new EnvironmentPlugin(['NODE_ENV']),
    new DefinePlugin({
        '__GOOGLE_CLIENT_ID__': JSON.stringify(process.env.GOOGLE_CLIENT_ID),
        '__GOOGLE_CLIENT_SECRET__': JSON.stringify(process.env.GOOGLE_CLIENT_SECRET),
        '__AUTH_URL__': JSON.stringify(process.env.AUTH_URL),
        '__API_URL__': JSON.stringify(process.env.API_URL),
        '__DEBUG__': JSON.stringify(! production)
    })
];

module.exports = {

    plugins,

    // Load this and everythning it cares about
    entry: `${__dirname}/src/main.js`,

    devServer: {
        historyApiFallback:true
    },

    devtool: 'source-map',


    // Stick it into the "path" folder with that file name
    output: {
        filename: 'bundle.[hash].js',
        path: `${__dirname}/build`,
        publicPath: process.env.CDN_URL        
    },

    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_module/,
              loader: 'babel-loader',
            },
            {
              test: /\.scss$/,
              loader: ExtractPlugin.extract({
                use: [
                  'css-loader',
                  'resolve-url-loader',
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true,
                      includePaths: [`${__dirname}/src/style`],
                    }
                  }
                ],
              }),
            },
            {
              test: /\.icon.svg$/,
              loader: 'raw-loader',
            },
            {
              test: /\.(woff|woff2|ttf|eot).*/,
              exclude: /\.icon.svg/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 10000,
                    name: 'font/[name].[hash].[ext]',
                  },
                },
              ],
            },
            {
              test: /\.(jpg|jpeg|gif|png|tiff|svg)$/,
              exclude: /\.icon.svg$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 60000,
                    name: 'assets/images/[name].[ext]',
                  },
                },
              ],
            },
            {
              test: /\.(mp3|aac|aiff|wav|flac|m4a|ogg)$/,
              exclude: /\.glyph.svg/,
              use: [
                {
                  loader: 'file-loader',
                  options: { name: 'audio/[name].[ext]' },
                },
              ],
            },
          ],
        },
    };