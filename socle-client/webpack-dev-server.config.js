module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "./dist/bundle.js",
    },
    devServer: {
        historyApiFallback: true,
    },
    devtool: "source-map",
    resolve: {
        alias: {
            config$: require.resolve("./config.dev.js")
        },
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loaders: ["react-hot-loader", "ts-loader"] }
        ],
        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    }
}