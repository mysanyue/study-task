module.exports = {
  publicPath: process.env.VUE_PRO,
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        modules: {
          mode: 'local',
          localIdentName: '[local]-[hash:base64:6]'
        },
        localsConvention: 'camelCaseOnly'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:57376',
        ws: false,
        changeOrigin: true
      },
      '/account': {
        target: 'http://localhost:57376',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
