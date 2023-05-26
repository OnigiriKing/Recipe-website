const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dir'),
        filename: 'js/bundle.js'
    },
    devServer: {
        static: "./dir"
    },
    plugins: [
        new HtmlWebpackPlugin({
            fileName: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader'}
        }]
    }
};