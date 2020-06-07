const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 优化方法：
// tree shaking：去除没有引用的代码。 export、optimizition: usedExports\minimize
// 代码分离，提取公共代码：整合重复的代码分割到 chunk 文件。 配置 splitChunks 
// 懒加载（按需加载）： 交互时加载模块 import()
// 缓存： filename: '[name].[chunkhash].bundle.js' 配合 HashedModuleIdsPlugin，对改动的文件进行改变 hash 文件名。没改动则 hash 不变。

module.exports = {
    // 入口文件，多入口配置
    entry: {
        app: './src/index.js',
        // print: './src/print.js'
    },
    // 输出
    output: {
        path: path.resolve(__dirname, '../dist'),
        // chunkFilename: '[name].bundle.js', // 非入口 chunk 的名称
        filename: '[name].[chunkhash].bundle.js', // hash 若为 [hash:8]时，则根据文件内容改变，解决缓存问题（所有文件名的 hash 都会变）
    },

    resolve: {
        // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件 (package.json 文件对应的 jsnext:main main)
        mainFields: ['jsnext:main', 'browser', 'main']
    },

    optimization: {
        // 代码分割  V4 用 splitChunks  V4前是 CommonsChunkPlugin
        splitChunks: {
            // async 表示只从异步加载得模块（动态加载import()）里面进行拆分
            // initial 表示只从入口模块进行拆分
            // all 表示以上两者都包括
            chunks: 'all',
            minSize: 30000, // 30k
            maxSize: 0,
            minChunks: 1, // 分离前，该块被引入的次数（也就是某个js文件通过import或require引入的次数
            maxAsyncRequests: 6, // 内层文件（第二层）按需加载时最大的并行加载数量
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/, // 匹配选中的 moudule
                    priority: -10 // 优先级，权重高则先提取
                },
                default: {
                    minChunks: 2, // 默认别引用2次
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },

    // loader
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] // 从后向前加载 loader，当前 loader 输出作为下一个 loader 的输入
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'img_[hash].[ext]',
                        outputPath: 'assets/images/'
                    }
                }]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts/'
                    }
                }]
            }
        ]
    },
    // 插件
    plugins: [
        // 清理 dist 
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        // html 生成插件
        new HtmlWebpackPlugin({
            title: 'Webpack 构建起步',
            template: './src/index.html'
        }),
        new webpack.HashedModuleIdsPlugin(),
    ]
};