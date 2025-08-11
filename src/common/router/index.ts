import { createRouter, createWebHashHistory } from 'vue-router'

import LoginPage from '@/login/views/LoginPage.vue'
import SignupPage from '@/login/views/SignupPage.vue'
import CoinTest from '@/common/components/CoinTest.vue'
import UserInfo from '@/login/views/UserInfo.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: LoginPage },
    { path: '/login', name: '로그인', component: LoginPage },
    { path: '/signup', name: '회원가입', component: SignupPage },
    { path: '/home', name: '홈', component: CoinTest },
    { path: '/user-info', name: '사용자정보', component: UserInfo },
  ],
})

export default router
