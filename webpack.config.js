const path = require('path')

module.exports = {
    entry: './index.js',
    output: {
        filename: './dist/bundle.js',
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: 'ts-loader' },
            { test: /\.js$/, loader: 'source-map-loader' },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname),
        },
        compress: true,
        port: 9000,
    },
}
