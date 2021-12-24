import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'

import zhCN from './locales/zhCN'

const i18n = createI18n({
    locale: 'zhCN',
    fallbackLocale: 'en',
    messages: {
        zhCN,
    },

    // fallbackWarn: false,
    // missingWarn: false,
    // debug: false,
})

createApp(App).use(i18n).use(router).mount('#app')
