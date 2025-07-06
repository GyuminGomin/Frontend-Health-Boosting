import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/login/views/LoginPage.vue'
import CoinTest from '@/common/components/CoinTest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: LoginPage },
    { path: '/login', name: 'loginPage', component: LoginPage },
    { path: '/home', name: 'HomePage', component: CoinTest },
  ],
})

export default router
