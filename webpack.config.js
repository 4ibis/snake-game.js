const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: { snake: './src/snake/index.ts', pixel: './src/pixel/index.ts' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[id].js',
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
            template: 'src/index.ejs',
            filename: 'index.html',
            templateParameters: {
                styles_src: 'styles/base.css',
                title: 'dev | games',
            },
            inject: false,
        }),
        new HtmlWebpackPlugin({
            template: 'src/snake.ejs',
            filename: 'snake.html',
            templateParameters: {
                script_src: 'snake.js',
                styles_src: ['styles/snake.css', 'styles/base.css'],
                title: 'dev | snake.js',
            },
            chunks: ['snake'],
            inject: false,
        }),
        new HtmlWebpackPlugin({
            template: 'src/pixel.ejs',
            filename: 'pixel.html',
            templateParameters: {
                script_src: 'pixel.js',
                styles_src: ['styles/base.css', 'styles/pixel.css'],
                title: 'dev | pixel.js',
            },
            chunks: ['pixel'],
            inject: false,
        }),
        new CopyPlugin({
            patterns: ['styles/*'],
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
