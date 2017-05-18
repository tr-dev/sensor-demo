var path    = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
      'react-hot-loader/babel',
      'webpack-hot-middleware/client',
      './src'
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js',

    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    plugins : [

      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
};
