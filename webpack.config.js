const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ( env, arg ) => {
	return {
		mode: 'development',
		entry: {
			'crypto-bot': './src/index.tsx'
		},
		output: {
			filename: '[name].main.js'
		},
		devtool: 'source-map',
		resolve: {
			extensions: [ '.ts', '.tsx', '.js', '.jsx' ]
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: "ts-loader",
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'src/index.html',
				templateParameters: {
					title: 'Crypto Bot'
				},
				hash: true,
			}),
		]
	}
}