const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const bundle_name = 'bundle.js'
const public_dir = 'docs'

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, public_dir),
        filename: bundle_name,
    },
    plugins: [
        new CopyPlugin({
            patterns: ['styles.css'],
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: 'index.ejs',
            templateParameters: {
                script_src: bundle_name,
                title: 'alpha | snake.js',
            },
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{ test: /\.ts?$/, loader: 'ts-loader' }],
    },
}
