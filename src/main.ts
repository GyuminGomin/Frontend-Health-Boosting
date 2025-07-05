import App from '@/App.vue'
import '@/main.scss'
import router from '@/common/router'
import 'vuetify/styles' // Vuetify 스타일을 전역에서 로드

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { createPinia } from 'pinia'

const app = createApp(App)

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        // primary: '#42b883', // 커스터마이징 색상
        // secondary: '#35495e',
      },
    },
  },
}) // Vuetify 인스턴스 생성

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
