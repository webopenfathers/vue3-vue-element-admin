const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // webpack devServer 提供了代理的功能，该代理可以把所有请求到当前服务中的请求，转发（代理）到另外一个服务器上
  devServer: {
    proxy: {
      // 当地址中包含 /api 的时候，触发此代理
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true
      }
    }
  },
  chainWebpack(config) {
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
