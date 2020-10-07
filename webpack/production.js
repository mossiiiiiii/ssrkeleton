process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcDir = path.join(__dirname, './../src');
const distDir = path.join(__dirname, './../dist');

const client = {
    name:'client',
    mode: 'production',
    target: 'web',
    entry: `${srcDir}/client.js`,
    output:{
        path: distDir,
        filename:'client',
        publicPath: distDir,
    },
    resolve:{
        extensions:['.js','.jsx']
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules[\\\/])/,
                use:[
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
                    }
                ]
            }
        ]
    },
    plugins:[
        new Dotenv({systemvars: true}),
    ]
};
const server = {
    name:'client',
    mode:'production',
    target:'node',
    entry:`${srcDir}/server.js`,
    output:{
        filename:'server',
        path: distDir,
        publicPath: distDir
    },
    resolve:{
        extensions:['.js','.jsx']
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules[\\\/])/,
                use:[
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
                    }
                ]
            }
        ]
    }

};




module.exports = [client,server];
