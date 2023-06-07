const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const jsMinimization = () => isProd ? new TerserPlugin() : null;
const cssMinimization = () => isProd ? new MiniCssExtractPlugin({
    filename: './public/css/[name].[contenthash].css',
}) : null;


module.exports = {
    entry: {
        auth: path.join(__dirname, 'src', 'public', 'admin', 'js', 'auth.js'),
        dashboard: path.join(__dirname, 'src', 'public', 'admin', 'js', 'dashboard.js'),
        appointments: path.join(__dirname, 'src', 'public', 'admin', 'js', 'appointments.js'),
        gallery: path.join(__dirname, 'src', 'public', 'admin', 'js', 'gallery.js'),
        user: path.join(__dirname, 'src', 'public', 'admin', 'js', 'user.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'public/js/[name].bundle.[contenthash].js',
        assetModuleFilename: 'public/images/[name][ext][query]',
    },
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte'),
            regexparam: path.resolve('node_modules', 'regexparam', 'dist', 'index.mjs'),
        },
        extensions: ['.mjs', '.js', '.svelte', '.scss'],
        mainFields: ['svelte', 'browser', 'module', 'main'],
        conditionNames: ['svelte']
    },
    module: {
        rules: [
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'public/fonts/[name][ext]'
                }
            },
            {
                test: /\.js?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                },
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    "group-css-media-queries-loader",
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/i,
                type: 'asset/resource',
            },

        ],
    },

    devtool: process.argv[process.argv.indexOf('--mode') + 1] === 'development' ? 'cheap-module-source-map' : false,

    plugins: [
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist'],
                },
            },
        }), new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/public/admin/html/auth.html'),
            filename: 'auth.html',
            chunks: ['auth']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/public/admin/html/dashboard.html'),
            filename: 'dashboard.html',
            chunks: ['dashboard']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/public/admin/html/appointments.html'),
            filename: 'appointments.html',
            chunks: ['appointments', 'gallery'],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/public/admin/html/user.html'),
            filename: 'user.html',
            chunks: ['user']
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/public/images',
                    to: 'images',
                },
            ],
        }),
        cssMinimization(),
    ],

    devServer: {
        historyApiFallback: true,
        proxy: {
            '/': {
                target: 'http://localhost:8080',
                pathRewrite: {'^/': ''}
            }
        },
        client: {
            overlay: true,
        }, watchFiles: path.join(__dirname, 'src'), port: 9000, liveReload: true,
    },

    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ['gifsicle', {interlaced: true}],
                            ['jpegtran', {progressive: true}],
                            ['optipng', {optimizationLevel: 5}],
                            ['svgo', {name: 'preset-default'}],
                        ],
                    },
                },
            }),

            jsMinimization(),
        ],
    },
};
