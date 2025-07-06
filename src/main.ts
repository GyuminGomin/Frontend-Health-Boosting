import App from '@/App.vue'
import '@/main.scss'
import router from '@/common/router'
import 'vuetify/styles' // Vuetify 스타일을 전역에서 로드

import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import { createPinia } from 'pinia'

const app = createApp(App)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  components,
}) // Vuetify 인스턴스 생성

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
