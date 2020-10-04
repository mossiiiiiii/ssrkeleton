const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const distDir = path.join(__dirname, '../dist');
const srcDir = path.join(__dirname, '../src');

module.exports = [
    {
        name: 'client',
        mode:'development',
        target: 'web',
        entry: `${srcDir}/client.js`,
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'client.js',
            publicPath: '/dist/',
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                      "babel-loader",
                      "eslint-loader"
                    ]
                },
                {
                  test: /\.(css|scss)$/,
                  use: [
                      {
                          loader: 'css-hot-loader?cssModule=true',
                      },
                      {
                          loader: MiniCssExtractPlugin.loader
                      },
                      {
                          loader: 'css-loader',
                          options: {
                              sourceMap: true,
                              importLoaders: 1
                          }
                      },
                  ]
              },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            }),
            new webpack.HotModuleReplacementPlugin(),
        ]
    },
    {
        name: 'server',
        mode:'development',
        target: 'node',
        entry: `${srcDir}/server.js`,
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'server.js',
            libraryTarget: 'commonjs2',
            publicPath: '/dist/',
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        "babel-loader",
                        "eslint-loader"
                    ]
                },
                
            ],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
];