const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const bundle_name = 'bundle.js'

module.exports = {
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname),
        filename: bundle_name,
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.ts?$/, loader: 'ts-loader' },
            { test: /\.js$/, loader: 'source-map-loader' },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: 'index.ejs',
            templateParameters: {
                script_src: bundle_name,
                styles_src: 'styles.css',
                title: 'dev | Snake.js',
            },
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname),
        },
        compress: true,
        port: 9000,
    },
}
