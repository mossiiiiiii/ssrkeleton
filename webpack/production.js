const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StatsPlugin = require('stats-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const distDir = path.resolve(process.cwd(), './dist');
const srcDir = path.resolve(process.cwd(), './src');

const client = {
        name: 'client',
        mode: 'production',
        target: 'web',
        performance: {hints: false},
        entry: [`${srcDir}/client.js`],
        output: {
            path: distDir,
            filename: 'client.js',
            publicPath: distDir
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                // modules: true,
                                // localIdentName: '[local]__[hash:base64:5]',
                                // sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // sourceMap: true,
                                outputStyle: 'compressed',
                                includePaths: [`${srcDir}/App/App/_style/module`]
                            }
                        }
                    ]
                }
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            }),
            new Dotenv({systemvars: true}),
            new webpack.optimize.OccurrenceOrderPlugin(),
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false,
                        }
                    },
                    extractComments: {
                        banner: false
                    },
                    extractComments: false,
                }),
            ]
        }
    };
const server = {
    name: 'server',
    mode: 'production',
    target: 'node',
    performance: {hints: false},
    entry: [`${srcDir}/server.js`],
    output: {
        path: distDir,
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        publicPath: distDir,
    },
    externals: {
        bufferutil: 'commonjs bufferutil',
        'utf-8-validate': 'commonjs utf-8-validate',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules[\\\/])/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: 'isomorphic-style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // sourceMap: true,
                            outputStyle: 'compressed',
                            includePaths: [`${srcDir}/App/App/_style/module`]
                        }
                    }
                ]
            }
        ],
    },
    plugins: [

        new StatsPlugin('stats.json', {
            chunkModules: true,
            modules: true,
            chunks: true,
            exclude: [/node_modules[\\\/]react/],
        }),
    ],
};
module.exports = [client,server];
