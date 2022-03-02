const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
   mode: 'none',
   entry: {
       'index': './src/index.js',
       'index.min': './src/index.js'
   },
   output: {
       filename: '[name].js',
       library: 'index',
       libraryTarget: 'umd',
       libraryExport: 'default',
       globalObject: 'this'
   },
   optimization: {
       minimize: true,
       minimizer: [
           new TerserPlugin({
               include: /\.min\.js$/,
           })
       ]
   }
}