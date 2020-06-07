## webpack 构建，从零开始

### 前言

前端领域，知识面越来越广，而前端工程化、自动化又是前端开发中必不可少的一个环节。webpack，是这个环节中的一个佼佼者。俗话说，工欲善其事，必先利其器！让我们来从零开始去学习webpack构建吧！

### webpack 能力
Webpack 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

四个核心概念：

- 入口(entry)
- 输出(output)
- loader
- 插件(plugins)

### 本项目
本项目是依据官方指南，进行一步一步的搭建以及完善webpack的功能配置，包括初始化配置、代码转化、代码分割、tree shaking、缓存、devtool配置等方面。后面，会依据现在流行框架和技术，做相应的配置搭建。

另外，本项目只是实现功能的配置，不会实现界面UI，点到为止。配置以及功能大部分会打上注释。

### 项目启动

依赖安装
```bash
$ yarn
```

本地dev模式
```bash
$ yarn dev
```

编译打包
```bash
$ yarn build
```