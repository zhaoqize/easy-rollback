var path = require('path');

var config = {
    entry: {
      rollback: './lib/rollback.js'
    },
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }]
    },
};


module.exports = config;
