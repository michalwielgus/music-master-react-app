var path = require('path');
var react = require('react')

module.exports = {
    entry: ['./src/main.js'],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                query: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
  node: {
    fs: 'empty',
  },
    devServer: {
        port: 3000,
        contentBase: './build',
        inline: true
    },
}
