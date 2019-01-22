const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: `${__dirname}/dist`,
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: 'ts-loader' },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './src/index.html',
                to: './index.html',
            },
        ]),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
    }
};
