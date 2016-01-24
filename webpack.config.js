var path = require('path');
var webpack = require('webpack');
var aliases = require('./aliases');

/* module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        html : './index.html',
        javascript: [
            // 'webpack-dev-server/client?http://localhost:3000',
            'webpack-hot-middleware/client',
            './src/index.jsx'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'static/js/bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: path.join(__dirname, 'src')
            },
            {
                test: /index\.html$/,
                loader: 'file?name=[name].[ext]'
            }
        ]
    },
    resolve: {
        root: path.join(__dirname, 'node_modules'),
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js', '.jsx'],
        alias : aliases
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        colors: true,
        port: 3000,
        chunkModules: false,
        historyApiFallback: true,
        inline: true
    }
}; */

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'static/js/bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.jsx?/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }]
    },
    resolve: {
        root: path.join(__dirname, 'node_modules'),
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js', '.jsx'],
        alias : aliases
    },
};
