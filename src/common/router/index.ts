import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/login/views/LoginPage.vue'
import CoinTest from '@/common/components/CoinTest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: CoinTest },
    { path: '/login', name: 'loginPage', component: LoginPage },
  ],
})

export default router
