var webpack = require('webpack');

module.exports = {
    entry: './frontend/src/init.js',
    output: {
        path: __dirname,
        filename: 'backend/core/lib/public/bundle.js',
    },
    module: {
        loaders: [
          {
            test: /\.jsx?$/,

            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
              babelrc: false,
              presets: ['react']
            }
          }
        ]
    }
};
