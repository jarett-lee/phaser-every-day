/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* global __dirname */
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const config = {
    entry: {
        "tic-tac-toe": "./src/projects/tic-tac-toe/scripts/index.ts",
        "unknown-second-project": "./src/projects/unknown-second-project/scripts/index.ts",
    },
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
    plugins: [new CleanWebpackPlugin()],
    resolve: {
        extensions: [
            ".ts",
            ".js",
        ],
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(
            __dirname,
            "dist",
            "scripts",
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
