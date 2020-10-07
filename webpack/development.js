const webpack = require('webpack');
const Dotenv = require('dotenv-webpack')
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const srcDir = path.join(__dirname, './../src');
const distDir = path.join(__dirname, './../dist');

const client = {
    name: 'client',
    mode:'development',
    target: 'web',
    entry: ['webpack-hot-middleware/client?name=client&reload=true', `${srcDir}/client.js`],
    output: {
        filename: 'client.js',
        publicPath: distDir,
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules[\\\/])/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                            plugins: [
                                "@babel/plugin-transform-runtime",
                                "@babel/plugin-proposal-object-rest-spread",
                                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                                ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                              ]
                        }
                    },
                    {
                        loader: 'eslint-loader'
                    }
                ],
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
        new Dotenv({systemvars: true}),
        new webpack.HotModuleReplacementPlugin(),
    ]
};

const server =     {
    name: 'server',
    mode:'development',
    target: 'node',
    entry: ['webpack-hot-middleware/client?name=server&reload=true', `${srcDir}/server.js`],
    output: {
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        publicPath: path.resolve(process.cwd(), '.' + '/dist'),
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
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                            plugins: [
                                "@babel/plugin-transform-runtime",
                                "@babel/plugin-proposal-object-rest-spread",
                                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                                ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                              ]
                        }
                    },
                    {
                        loader: 'eslint-loader'
                    }
                ],
            },
            
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}


module.exports = [client,server];