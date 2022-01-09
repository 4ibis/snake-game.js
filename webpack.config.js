module.exports = {
    entry: "./snake-game.js",
    output: {
        filename: "./bundle.js",
    },
    mode: 'development',
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"],
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: "ts-loader" },
            { test: /\.js$/, loader: "source-map-loader" },
        ],
    },
};
