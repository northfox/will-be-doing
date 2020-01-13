module.exports = {
  devServer: {
    proxy: {
      '/app/': {
        target: 'http://localhost:8080/will_be_doing/api/',
        changeOrigin: true,
        pathRewrite: {
          '^/app': ''
        }
      }
    }
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  }
}
