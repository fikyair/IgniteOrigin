var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.(jsx|js)?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                plugins: ['transform-runtime'],
                presets: ['es2015', 'react', 'stage-2']
            }
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        },{
            test: /\.less?$/,
            use: [
                "style-loader", // creates style nodes from JS strings,
                'postcss-loader',
                "less-loader", // compiles Sass to CSS
            ]
        }]
    },
    plugins: [
        new OpenBrowserPlugin(
            {
                url: 'http://localhost:8080'
            }
        ),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.less', '.css']
    },
    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
        assetFilter: function(assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');

        }
    }
};