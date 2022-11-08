const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const timestamp = new Date().getTime()
const bundle_name = 'bundle.js'
const script_src = `${bundle_name}?v=${timestamp}`
const styles_src = `styles.css?v=${timestamp}`
const public_dir = 'docs'

module.exports = {
    mode: 'production',
    entry: './index.ts',
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
                script_src,
                title: 'alpha | snake.js',
                styles_src,
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
