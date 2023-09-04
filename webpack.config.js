const path = require("path")
const TerserPlugin = require("terser-webpack-plugin");
const glob = require("glob")
const pjson = require('./package.json');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = function (env) {
    const mode = process.env.NODE_ENV || 'beta';
    const version = pjson.version || '1.0.0';

    return {
        mode: mode == 'production' ? mode : 'development',
        entry: (() => {
            let result = glob.sync('./build/static/js/**.js').reduce(function (obj, el) {
                obj[path.parse(el).name] = el;
                return obj
            }, {})
            result[`bundles.min`] = glob.sync(`./build/static/js/**.js`).map(f => path.resolve(__dirname, f))
            return result;
        })(),
        output: {
            path: path.resolve(__dirname, `bundles/${mode}/${version}`),
            filename: "[name].js"
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin({
                extractComments: false,
            })],
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve('build/static/media'),
                        to: path.resolve(`bundles/${mode}/${version}/static/media`),
                        toType: 'dir',
                        filter: async (resourcePath) => {
                            const medias = glob.sync(`bundles/${mode}/${version}/static/media`).map(f => path.resolve(__dirname, f));
                            if (!medias || !medias.length) {
                                return true;
                            }
                            return false;
                        },
                    }
                ],
            }),
        ],
    }
}
