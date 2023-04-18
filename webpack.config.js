const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    entry: slsw.lib.entries,
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: [/node_modules/],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};