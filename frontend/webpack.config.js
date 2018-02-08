const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

module.exports = function(env) {
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
			new UglifyJsPlugin({
				sourceMap: true
			}),
			new CopyWebpackPlugin([
				{ from: 'assets/', to: 'assets/'}
			]),
			new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
			}),
		]
	};

	if (env.production) {
		config.plugins.push(
			new CompressionPlugin({
				asset: "[path][query]",
				algorithm: 'gzip',
			})
		)
	}

	return config;
}