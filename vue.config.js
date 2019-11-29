module.exports = {
  configureWebpack: {
    resolve: {
      // 后綴名
      // extnesions:[],
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  devServer: {
    proxy: {
      '/api': { 
        target: 'http://47.103.221.217:8009', //对应服务器地址
        changeOrigin: true, //允许跨域
        ws: true,
        pathRewrite: {
        '^/api': ''
        }
      }
    }
  }
}