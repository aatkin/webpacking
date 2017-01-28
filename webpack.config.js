const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: {
        app: ['webpack-hot-middleware/client', './client/index.js']
    },
    output: {
        devtoolLineToLine: true,
        sourceMapFilename: './bundle.js.map',
        pathinfo: true,
        path: __dirname + "/dist",
        filename: "bundle.js"
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
            }
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
         * HtmlWebpackPlugin automatically builds html file based on the template (which can be in just about any templating language, i think)
         * this removes the need to manually insert any script or css tags
         */
        new HtmlWebpackPlugin({
            title: 'Wworker test',
            template: './views/index.ejs',
            inject: 'body'
        }),
        /*
         * Livereload handles HTML && CSS changes, which the webpack dev server cannot handle
         * Basically CSS styles are reloaded without refresh, and HTML causes page refresh
         */
        new LiveReloadPlugin({
            appendScriptTag: true
        })
    ],

    /*
     * Settings for dev server
     * enable source maps and tell dev server to inline HMR (no iframe kicky mouseing)
     */
    devtool: 'source-map',
    devServer: {
        inline: true
    }
};
