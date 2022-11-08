const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: 'bundle.js',
    },
    plugins: [
        new CopyPlugin({
            patterns: ['styles.css'],
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: 'index.ejs',
            templateParameters: {
                script_src: 'bundle.js',
                styles_src: 'styles.css',
                title: 'alpha | snake.js',
            },
        }),
    ],
    resolve: {
        extensions: ['', '.ts', '.js'],
    },
    module: {
        rules: [{ test: /\.ts?$/, loader: 'ts-loader' }],
    },
}
