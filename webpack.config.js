/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* global __dirname */
const path = require("path");

const config = {
    entry: "./src/js/index.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: [
            ".ts",
            ".js",
        ],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(
            __dirname,
            "dist",
        ),
    },
};

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        config.devtool = "source-map";
        config.devServer = {contentBase: "./dist"};
    }

    return config;
};
