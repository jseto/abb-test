const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ( env, arg ) => {
	return {
		mode: 'development',
		entry: {
			'abb-test': './src/index.tsx'
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
				},
				{
					test: /\.svg$/,
					use: [
						'desvg-loader/preact', // Add loader (use 'desvg-loader/react' for React)
						'svg-loader', // svg-loader must precede desvg-loader
					],
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader"
					]
				},
				{
			    test: /\.scss$/,
			    use: [
			      MiniCssExtractPlugin.loader,
			      "css-loader",
			      "sass-loader"
			    ],
			  },
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'wish-to-go.css'
			}),
			new HtmlWebpackPlugin({
				template: 'src/index.html',
				templateParameters: {
					title: 'Abb Test'
				},
				hash: true,
			}),
		]
	}
}