const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
const isDevelopment = !process.env.production;
const assetsPath = path.join(__dirname, '/public');

const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
    disable: isDevelopment
});

const config = {
    entry: 
    ['babel-polyfill', './src/js/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }]
        }, {
            test: /\.sass$/,
            exclude: [/node_modules/],
            use: extractSass.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before sass-loader if necessary
                use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: !isDevelopment
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 4 version']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    'sass-loader',
                    'resolve-url-loader'
                ]
            })
        }, {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]'
                    }
                }, {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 70
                        }
                    }
                },
            ],
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name][hash].[ext]'
                }
            },
        }]
    },
    plugins: [
        extractSass
        // new BundleAnalyzerPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9001
    }
};

if (isDevelopment) {
    fs.readdirSync(assetsPath)
        .map((fileName) => {
            if (['.css', '.js'].includes(path.extname(fileName))) {
                return fs.unlinkSync(`${assetsPath}/${fileName}`);
            }

            return '';
        });
} else {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}

module.exports = config;
