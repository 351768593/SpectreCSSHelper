import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'

// 高亮库
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import hljsVuePlugin from "@highlightjs/vue-plugin"
hljs.registerLanguage('xml', xml);

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

createApp(App)
.use(i18n)
.use(router)
.use(hljsVuePlugin)
.mount('#app')
