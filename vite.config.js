const { resolve } = require('path')

module.exports = {
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, './index.html'),
        hex: resolve(__dirname, './hex.html'),
        game: resolve(__dirname, './level.html')
      }
    }
  }
}