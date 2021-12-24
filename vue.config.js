module.exports = {
    devServer: {
        host: '0.0.0.0',
        https: false,
        port: 8080,
        public: 'http://localhost:8080'
    },

    pluginOptions: {
      i18n: {
        locale: 'zhCN',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableLegacy: false,
        runtimeOnly: false,
        compositionOnly: false,
        fullInstall: true
      }
    }
}
