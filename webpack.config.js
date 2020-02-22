/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* global __dirname */
const path = require("path");
const fs = require("fs");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
            {
                test: /\.html$/,
                use: "html-loader",
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].html",
                            context: "src",
                        },
                    },
                    "extract-loader",
                    "html-loader",
                    "markdown-loader",
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin(["src/index.html"]),
        new HtmlWebpackPlugin({
            chunks: ["tic-tac-toe"],
            filename: "projects/tic-tac-toe/index.html",
            template: "src/projects/tic-tac-toe/index.html",
        }),
        new HtmlWebpackPlugin({
            chunks: ["unknown-second-project"],
            filename: "projects/unknown-second-project/index.html",
            template: "src/projects/unknown-second-project/index.html",
        }),
    ],
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
            "docs",
        ),
    },
};

module.exports = (env, argv) => {
    const postsDir = path.join(__dirname, "src", "posts");
    config.entry["posts"] = fs
        .readdirSync(postsDir)
        .filter(file => path.extname(file) === ".md")
        .map(file => path.relative(__dirname, path.join(postsDir, file)))
        // TODO find a nicer way to add the preceding dot
        .map(file => "./" + file);

    if (argv.mode === "development") {
        config.devtool = "source-map";
        config.devServer = {
            contentBase: "./dist",
            writeToDisk: true,
        };
        config.output.path = path.resolve(
            __dirname,
            "dist",
        );
    }

    return config;
};
