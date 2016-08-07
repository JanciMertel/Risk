var webpack = require('webpack');

module.exports = {
    entry: [
        './src/init.js'
    ],
    output: {
        path: __dirname,
        filename: './dist/bundle.js',
        libraryTarget: "var",
        library: "ReactKonva"
    },
    externals: {
        'konva': 'Konva'
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
