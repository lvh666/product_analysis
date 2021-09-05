module.exports = {
  mode: process.env.ENV,
  publicPath: "./", //静态资源找不到
  runtimeCompiler: true,
  devServer: {
    open: false, //是否自动弹出浏览器页面
    host: "localhost",
    port: "8088",
    https: false,
    hotOnly: false,
    /*        proxy: {
          '/': {
              target: 'http://101.200.160.17:8080', //API服务器的地址
              ws: true,  //代理websockets
              changeOrigin: true, // 虚拟的站点需要更管origin
              pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                  '^/api': ''
              }
          }
      },*/
  },
};
