const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const  CompressionPlugin = require('compression-webpack-plugin');

module.exports = function(env) {
	if (typeof env == 'undefined') {
		env = {};
	}

	config = {
		entry: './src/Index.tsx',
		devtool: "source-map",
		output: {
			path: __dirname + '/build',
			filename: 'js/bundle.min.js'
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.gz']
		},
		module: {
			rules: [
				{test: /\.tsx?$/, loader: 'ts-loader'},
				{test: /\.scss$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [{loader: 'css-loader', options: { minimize: true }}, 'sass-loader']
					})
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'index.template.ejs'
			}),
			new ExtractTextPlugin('css/style.min.css'),
			new UglifyJsPlugin(),
			new CopyWebpackPlugin([
				{ from: 'assets/', to: 'assets/'}
			])
		]
	};

	if (env.travis) {
		config.plugins.push(
			new CompressionPlugin({
				asset: "[path][query]",
				algorithm: 'gzip',
			})
		)
	}

	return config;
}