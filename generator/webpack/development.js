const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

const DIST = path.join(__dirname, "../dist");
const SRC = path.join(__dirname, "../src");

madule.exports = [
  {
    name: "client",
    mode: "development",
    target: "web",
    devtool: "sourcemap",
    entry: `${SRC}/client.js`,
    output: {
      filename: "client.js",
      publicPath: "/dist/",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules[\\\/])/,
          use: ["babel-loader", "eslint-loader"],
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 1,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                outputStyle: "compressed",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
      new Dotenv({
        path: path.resolve(process.cwd(), ".env.development"),
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
  {
    name: "server",
    mode: "development",
    target: "node",
    devtool: "source-map",
    entry: `${SRC}/server.js`,
    output: {
      filename: "server.js",
      libraryTarget: "commonjs2",
      publicPath: "/dist/",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclue: /(node_modules[\\\/])/,
          use: ["babel-loader", "eslint-loader"],
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: "isomorphic-style-loader",
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 1,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                outputStyle: "compressed",
              },
            },
          ],
        },
      ],
    },
    plugin: [new webpack.HotModuleReplacementPlugin()],
  },
];
