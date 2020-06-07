const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    optimization: {
        // https://www.webpackjs.com/guides/tree-shaking/
        // tree shaking 条件：
        // 1. 使用 ES2015 模块语法（即 import 和 export）。
        // 2. 在项目 package.json 文件中，添加一个 "sideEffects" 入口。
        // 3. 引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）。
        // 以下两个配置为 true 会自动开启 tree shaking
        usedExports: true, // 标记哪些模块用了export， production模式下默认为true
        minimize: true, // production模式下默认为true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ]
});