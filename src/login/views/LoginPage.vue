<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <SkyBackground />
    <v-card class="pa-6 pa-sm-4" max-width="420" elevation="8" rounded="x1">
      <v-card-title class="text-h5 font-weight-bold text-center mb-4 d-flex align-center gap-2">
        <img
          src="@/common/assets/loading/HCoin2.png"
          width="64"
          height="64"
          alt="Logo"
          class="me-2"
        />
        Health Boost 로그인
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="loginForm.email"
            label="이메일"
            type="email"
            prepend-inner-icon="mdi-email"
            dense
            outlined
            required
          />
          <v-text-field
            v-model="loginForm.password"
            label="비밀번호"
            type="password"
            prepend-inner-icon="mdi-lock"
            dense
            outlined
            required
          />

          <v-btn class="mt-4" block color="primary" type="submit" :loading="loginForm.loading">
            로그인
          </v-btn>
        </v-form>

        <div class="d-flex justify-space-between mt-4 text-body-2">
          <router-link to="/signup">회원가입</router-link>
          <a href="#" @click.prevent="logout">로그아웃</a>
        </div>

        <v-divider class="my-6" />

        <div class="text-center text-caption mb-2">SNS 계정으로 로그인</div>

        <div class="d-flex flex-column gap-2">
          <v-btn
            block
            color="red darken-1"
            class="text-white"
            size="small"
            :loading="loginForm.loading_g"
            @click="loginWithGoogle"
          >
            <v-icon start size="small">mdi-google</v-icon>
            Google 로그인
          </v-btn>
          <v-btn
            block
            color="#03c75a"
            class="text-white"
            size="small"
            @click="loginWithNaver"
            :loading="loginForm.loading_n"
          >
            <v-icon start size="small">mdi-leaf</v-icon>
            Naver 로그인
          </v-btn>
          <v-btn
            block
            color="#FEE500"
            class="text-black"
            size="small"
            @click="loginWithKakao"
            :loading="loginForm.loading_k"
          >
            <v-icon start size="small">mdi-chat</v-icon>
            Kakao 로그인
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import SkyBackground from '@/common/components/background/SkyBackground.vue'
import { reactive } from 'vue'

const loginForm = reactive({
  email: '',
  password: '',
  loading: false,
  loading_g: false,
  loading_n: false,
  loading_k: false,
})

const login = () => {
  loginForm.loading = true

  setTimeout(() => {
    loginForm.loading = false
    alert(`로그인 시도: ${loginForm.email}`)
  }, 1000)
}

const logout = () => {
  alert('로그아웃 처리')
}

const loginWithGoogle = async () => {
  loginForm.loading_g = true
  await window.electronAPI.invoke(
    'oauth2:open',
    'http://localhost:8282/oauth2/authorization/google',
  )
  loginForm.loading_g = false
}

const loginWithNaver = async () => {
  loginForm.loading_n = true
  await window.electronAPI.invoke('oauth2:open', 'http://localhost:8282/oauth2/authorization/naver')
  loginForm.loading_n = false
}

const loginWithKakao = async () => {
  loginForm.loading_k = true
  await window.electronAPI.invoke('oauth2:open', 'http://localhost:8282/oauth2/authorization/kakao')
  loginForm.loading_k = false
}
</script>

<style scoped lang="scss">
.fill-height {
  min-height: 100vh;

  .v-card-title {
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.6;
    color: #333;
  }
}
</style>
