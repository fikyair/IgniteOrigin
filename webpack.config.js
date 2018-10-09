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
            test: /\.css?$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {importLoaders: 1} //这里可以简单理解为，如果css文档中有import 进来的文档也进行处理
                },
                {
                    loader: 'postcss-loader',
                    options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                        plugins: (loader) => [
                            require('postcss-import')({root: loader.resourcePath}),
                            require('autoprefixer')(), //CSS浏览器兼容
                            require('cssnano')()  //压缩css
                        ]
                    }
                }

            ]
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