/**
 * Created by tommy on 2016/6/11.
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        login:path.resolve(__dirname,"app/login.js"),
        user:path.resolve(__dirname,"app/user.js"),
        nav:path.resolve(__dirname,"app/nav.js")
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: path.resolve(__dirname, "node_modules"),
            include: path.resolve(__dirname, "app"),
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        colors: true,
        historyApiFallback: true,
        inline: true,
        port: 3001
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};