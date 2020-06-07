const path = require('path');
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
        minimize: false, // production模式下默认为true
    },

    // 此选项控制是否生成，以及如何生成 source map
    // (none)（省略 devtool 选项） - 不生成 source map。
    // -- 对于开发环境 --
    // eval - 每个模块都使用 eval() 执行，并且都有 //@ sourceURL。
    // eval-source-map - 每个模块使用 eval() 执行，并且 source map 转换为 DataUrl 后添加到 eval() 中。
    // cheap-eval-source-map - 类似 eval-source-map，每个模块使用 eval() 执行。这是 "cheap(低开销)" 的 source map，因为它没有生成列映射(column mapping)，只是映射行数。
    // cheap-module-eval-source-map - 类似 cheap-eval-source-map。loader source map 会被简化为每行一个映射(mapping)。
    // -- 对于特生产环境 --
    // source-map - sourceMap 的所有信息映射源代码至.[name].bundle.js.map中。不应将 source map 文件部署到 web 服务器。而是只将其用于错误报告工具。应服务器配置为，不允许普通用户访问 source map 文件！
    // hidden-source-map - 和 source-map 差不多，但[name].bundle.js 文件少了 map 文件的行注释
    // nosources-source-map - 创建的 source map 不包含 sourcesContent(源代码内容)。它可以用来映射客户端上的堆栈跟踪，而无须暴露所有的源代码。你可以将 source map 文件部署到 web 服务器。仍然会暴露反编译后的文件名和结构，但它不会暴露原始代码。
    // -- 对于特定环境 --
    // inline-source-map - source map 转换为 DataUrl 后添加到 bundle 中，整个 bundle 文件变得硕大无比
    // cheap-source-map - 没有列映射(column mapping)的 source map，忽略 loader source map。比 sourceMap 下生成的 .js.map文件内容更少（少了 names）
    // cheap-module-source-map - 没有列映射(column mapping)的 source map，将 loader source map 简化为每行一个映射(mapping)。比 cheap-source-map 下生成的 .js.map文件内容更少（sourcesContent 也没了）
    // inline-cheap-module-source-map - 类似 cheap-module-source-map，但是 source map 转换为 DataUrl 添加到 bundle 中。

    devtool: 'inline-source-map', 

    // 开启本地服务
    devServer: {
        port: 8888,//监听的端口号
        progress: true,//启动打包进度显示
        contentBase: path.join(__dirname, 'dist'),//这里指定启动目录
        compress: true //启动压缩
    }
});