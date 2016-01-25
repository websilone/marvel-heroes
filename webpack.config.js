var path = require('path');
var webpack = require('webpack');
var aliases = require('./aliases');

var DEVELOPMENT = process.env.NODE_ENV !== 'production';

var plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
];

if (DEVELOPMENT) {
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}
else {
    plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {screw_ie8: true, keep_fnames: false, warnings: false},
            mangle: {screw_ie8: true, keep_fnames: false}
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    );
}

module.exports = {
    devtool: DEVELOPMENT ? 'cheap-module-eval-source-map' : 'source-map',
    entry: DEVELOPMENT ? [
        'webpack-hot-middleware/client',
        './src/index'
    ] : ['./src/index', './index.html'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'static/js/bundle.js',
        publicPath: '/'
    },
    plugins: plugins,
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint'],
                include: path.join(__dirname, 'src')
            }
        ],
        loaders: [
            {
                test: /\.jsx?/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            }
        ]
    },
    resolve: {
        root: path.join(__dirname, 'node_modules'),
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js', '.jsx'],
        alias : aliases
    }
};
