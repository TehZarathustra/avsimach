var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
	entry: './app/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist')
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Avsimach',
			template: './app/index.ejs'
		}),

		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),

		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		hot: true,
		contentBase: path.resolve(__dirname, './dist'),
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						js: 'babel-loader',
						scss: 'css!sass'
					},
					postcss: [require('postcss-cssnext')()],
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.(css|sass)$/,
				use: [
					'style-loader',
					{loader: 'css-loader', options: { importLoaders: 1 }},
					{loader: 'postcss-loader', options: {
						plugins: function (loader) {
							return [
								require('postcss-import')({ root: loader.resourcePath }),
								require('postcss-cssnext')()
							]
						}
					}},
					'sass-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif|ico|mp4)$/,
				use: ['file-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			}
		]
	}
};
