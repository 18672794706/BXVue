// https://cli.vuejs.org/zh/config/#lintonsave
module.exports = {
  //部署应用的基本url  可用 process.env.NODE_ENV(development||production||test) 环境变量控制
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

  // 静态资源目录 (js, css, img, fonts, media)
  assetsDir: "static",

  // 输出文件目录
  outputDir: "dist",

  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: "index.html",

  // source map
  productionSourceMap: false,

  configureWebpack: (config) => {
    // 取消console打印
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
  },

  // devServer.proxy 可以是一个指向开发环境 API 服务器的字符串，也可以使用一个 path: options 成对的对象。
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8080,
    hot: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      // api为转发路径
      "/api": {
        // 目标地址
        target: "http://bx.bpmsh.top:8848/",
        // 是否代理websockets
        ws: true,
        // 设置同源  默认false，是否需要改变原始主机头为目标URL
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  }
};
