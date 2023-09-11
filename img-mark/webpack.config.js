const path = require('path');
const PACKAGE = require('./package.json');
const buildPaths = require('./configs/build-path.json');
const envPaths = require('./configs/envPaths.json');
const Dotenv = require('dotenv-webpack');

const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const packageVersion = PACKAGE.version;
const config = env => {
    const isProduction = env.production;
    const isBeta = env.beta;
    const isBuilt = isProduction || isBeta;
    const scope = env.scope;
    const envFilePath = envPaths[scope];
    const buildPath = buildPaths[scope];
    const srcBuild = (isBuilt ? `build/${scope}/` : 'dist/') + packageVersion;
    return {
        entry: {
            bundle: './src/index.js',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, srcBuild),
            chunkFilename: 'js/[name].[contenthash:8].chunk.js',
            assetModuleFilename: 'media/[name].[hash][ext]',
            clean: true,
            ...(isBuilt
                ? {
                    publicPath: buildPath + '/' + packageVersion + '/',
                }
                : {}),
        },
        ...(isBuilt
            ? {}
            : {
                devtool: 'inline-source-map',
                watch: true,
                watchOptions: {
                    ignored: /node_modules/,
                },
            }),
        resolve: {
            extensions: ['', '.js', '.jsx'],
            alias: {
                "@": path.resolve(__dirname, "./src/"),
                '@components': path.resolve(__dirname, "./src/components/"),
                '@common': path.resolve(__dirname, "./src/common/"),
                '@style': path.resolve(__dirname, "./src/style"),
                '@formControls': path.resolve(__dirname, './src/common/form-controls'),
                '@helper': path.resolve(__dirname, './src/common/helper'),
                '@utils': path.resolve(__dirname, './src/utils'),
                '@store': path.resolve(__dirname, './src/store'),
                '@HOC': path.resolve(__dirname, './src/common/HOC'),
                '@api': path.resolve(__dirname, './src/api'),
                '@customHook': path.resolve(__dirname, './src/common/hook'),
                '@constants': path.resolve(__dirname, './src/constants'),
                '@customRedux': path.resolve(__dirname, './src/custom-redux'),
                '@reduxStore': path.resolve(__dirname, './src/redux-store'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                '@babel/preset-env',
                                ['@babel/preset-react', { runtime: 'automatic' }],
                            ],
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    loader: 'file-loader',
                    test: /\.woff$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/,
                },
                {
                    test: /\.svg$/,
                    issuer: /\.jsx?$/,
                    use: [
                        {
                            loader: require.resolve('@svgr/webpack'),
                            options: {
                                prettier: false,
                                svgo: false,
                                svgoConfig: {
                                    plugins: [{ removeViewBox: false }],
                                },
                                titleProp: true,
                                ref: true,
                            },
                        },
                    ],
                },
            ],
        },
        ...(isBuilt
            ? {
                optimization: {
                    minimize: true,
                    minimizer: [
                        new TerserPlugin(),
                        new CssMinimizerPlugin(),
                    ],
                },
            }
            : {}),
        // plugins: [
        //     new Dotenv({ path: envFilePath }),
        //     new CopyWebpackPlugin({
        //         patterns: [
        //             { from: 'statistic', to: 'statistic' },
        //         ],
        //     }),
        // ],
    }
}

module.exports = config;