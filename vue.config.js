module.exports = {
  devServer: {
    proxy: {
      '/app/': {
        target: 'http://localhost:8080',
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
