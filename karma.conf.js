var webpack = require('webpack');
// var path = require('path');
var aliases = require('./aliases');

var KARMA_ENTRY_FILE = 'karma.entry.js';

module.exports = function (config) {
    var mode = process.env.NODE_ENV || 'development';

    var reporters = ['spec'];
    var singleRun = false;

    if (mode === 'production') {
        singleRun = true;
    }

    config.set({
        basePath: './',
        browsers: ['PhantomJS'],
        files: [
            './test/**/*.spec.js',
            './test/**/*.spec.jsx'
        ],
        frameworks: ['phantomjs-shim', 'jasmine'],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-spec-reporter',
            'karma-phantomjs-shim'
        ],
        preprocessors: {
            './test/test.helpers.js': ['webpack', 'sourcemap'],
            './test/**/*.spec.js': ['webpack', 'sourcemap'],
            './test/**/*.spec.jsx': ['webpack', 'sourcemap']
        },
        reporters: reporters,
        singleRun: singleRun,
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0'],
                        exclude : /node_modules/
                    },
                    // { test: /\.(jpg|gif|png|svg)$/, loader: 'file-loader?name=static/images/img-[hash:6].[ext]' },
                    { test: /\.json$/, loader: 'json-loader' }
                ]
            },
            resolve: {
                extensions: ['', '.js', '.jsx', '.json'],
                alias : aliases
            }
        },
        colors: true,
        logLevel: config.LOG_INFO,
        webpackMiddleware: {
            noInfo: true
        }
    });
}
