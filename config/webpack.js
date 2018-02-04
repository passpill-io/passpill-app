const { join } = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const babelOpts = require('./babel');
const styles = require('./styles');
const setup = require('./setup');

const dist = join(__dirname, '..', 'dist');
const exclude = /(node_modules|bower_components)/;
const src = join(__dirname, '..', 'src');

module.exports = env => {
	const isProd = env && env.production;

	if (isProd) {
		babelOpts.presets.push('babili');
	} else {
		styles.unshift({ loader:'style-loader' });
	}

	return {
		entry: {
			app: './src/js/boot.js',
			vendor: [
				// pull these to a `vendor.js` file
				'preact'
			]
		},
		output: {
			path: dist,
			filename: '[name].[hash].js',
			publicPath: '/'
		},
		resolve: {
			alias: {
				'src': src,
				'modules': join(src, 'js/modules'),
				'state': join(src, 'js/state'),
				'utils': join(src, 'js/utils'),
				'react': 'preact-compat',
				'react-dom': 'preact-compat'
			}
		},
		module: {
			rules: [
			/*{
				test: /\.jsx?$/,
				exclude: exclude,
				enforce: 'pre',
				use: 'source-map-loader'
			},*/
			{
				test: /\.jsx?$/,
				exclude: exclude,
				loader: {
					loader: 'babel-loader',
					options: babelOpts
				}
			}, {
				test: /\.(sass|scss)$/,
				use: isProd ? ExtractText.extract({ fallback:'style-loader', use:styles }) : styles
			}]
		},
		plugins: setup(isProd),
		devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
		devServer: {
			contentBase: dist,
			port: process.env.PORT || 3001,
			historyApiFallback: true,
			compress: isProd,
			inline: !isProd,
			hot: !isProd
		}
	};
};
