module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://pwtest.test',
        changeOrigin: true
      }
    }
  }
}
