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
  },
  module: {
    rules: [
      {
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				//这里表示排除node_modules或bower_components中的js文件
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						//plugins: ['@babel/plugin-transform-runtime']要用此处插件需要下载： npm add @babel/runtime和 npm add --dev @babel/plugin-transform-runtime
					}
				}
			}
    ]
  }
}