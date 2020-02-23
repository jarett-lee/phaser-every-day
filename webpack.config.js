/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* global __dirname */
const path = require("path");
const fs = require("fs");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    // entries dynamically generated based on src/posts and src/projects
    entry: {},
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
    ],
    resolve: {
        alias: {lib: path.resolve(__dirname, "src/lib/")},
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

// TODO find a nicer way to add the preceding dot
const addPrecedingDot = (file) => "./" + file;

const addProjects = () => {
    const projectsDir = path.join(__dirname, "src", "projects");

    const projects = fs.readdirSync(projectsDir).map(file => ({
        basename: file,
        indexHtmlRelativePath: path.join("projects", file, "index.html"),
        indexTsRelativePath: path.join("projects", file, "scripts", "index.ts"),
        hasIndexHtml: fs.existsSync(path.join(projectsDir, file, "index.html")),
        hasIndexTs: fs.existsSync(path.join(projectsDir, file, "scripts", "index.ts")),
    }));

    const projectsWithNoIndexHtml = projects.filter(project => !project.hasIndexHtml);
    if (projectsWithNoIndexHtml.length > 0) {
        console.warn(`Following projects have no index.html file: ${projectsWithNoIndexHtml}`);
    }
    const projectsWithNoIndexTs = projects.filter(project => !project.hasIndexTs);
    if (projectsWithNoIndexTs.length > 0) {
        console.warn(`Following projects have no scripts/index.ts file: ${projectsWithNoIndexTs}`);
    }

    const validProjects = projects.filter(project => project.hasIndexHtml && project.hasIndexHtml);

    validProjects.forEach(project => {
        config.entry[project.basename] = addPrecedingDot(path.join("src", project.indexTsRelativePath));
        config.plugins.push(new HtmlWebpackPlugin({
            chunks: [project.basename],
            filename: project.indexHtmlRelativePath,
            template: path.join("src", project.indexHtmlRelativePath),
        }));
    });
};

const addDevPosts = () => {
    const postsDir = path.join(__dirname, "src", "posts");
    config.entry["posts"] = fs
        .readdirSync(postsDir)
        .filter(file => path.extname(file) === ".md")
        .map(file => path.relative(__dirname, path.join(postsDir, file)))
        .map(addPrecedingDot);
};

module.exports = (env, argv) => {
    addDevPosts();
    addProjects();

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
