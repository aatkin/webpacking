const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        client: [
            'webpack-hot-middleware/client',
            'webpack/hot/dev-server',
            './client/src/index.js'
        ]
    },
    output: {
        sourceMapFilename: '[name].map',
        path: __dirname + "/dist",
        filename: "[name].js",
        chunkFilename: "[id].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            /*
             * Used to allow EJS-template into dependency tree (makes HMR play nicely)
             */
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            /*
             * ExtractTextPlugin is apparently unusable with HMR, production only?
             */
            // {
            //     test: /\.scss$/,
            //     loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            // }
        ],
    },
    plugins: [
        /*
         * These plugins are needed for the webpack dev server with HMR support (no clue why, but they're there)
         */
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

        /*
         * ExtractTextPlugin is apparently unusable with HMR, production only?
         */
        // new ExtractTextPlugin("[name].css", { allChunks: true }),

        /*
         * HtmlWebpackPlugin automatically builds html file based on the template (which can be in just about any templating language, i think)
         * this removes the need to manually insert any script or css tags
         */
        new HtmlWebpackPlugin({
            template: './views/index.ejs',
            inject: 'body'
        })
    ],

    /*
     * Settings for dev server
     * enable source maps and tell dev server to inline HMR (no iframe kicky mouseing)
     */
    devtool: 'source-map',
    devServer: {
        inline: true,
        hot: true
    },

    /*
     * Web worker settings
     */
    worker: {
        output: {
            filename: '[name].worker.js',
            chunkFilename: '[name].worker.js'
        }
    }
};
