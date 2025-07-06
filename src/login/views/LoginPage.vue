<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <div class="sky-wrapper"></div>
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
          <a href="#" @click.prevent="signup">회원가입</a>
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
const signup = () => {
  alert('회원가입 페이지로 이동')
}

const logout = () => {
  alert('로그아웃 처리')
}

const loginWithGoogle = () => {
  loginForm.loading_g = true
  setTimeout(() => {
    loginForm.loading_g = false
    alert(`로그인 시도: ${loginForm.email}`)
  }, 1000)
  // window.location.href = 'https://your-backend.com/oauth2/authorize/google'
}

const loginWithNaver = () => {
  loginForm.loading_n = true
  setTimeout(() => {
    loginForm.loading_n = false
    alert(`로그인 시도: ${loginForm.email}`)
  }, 1000)
  // window.location.href = 'https://your-backend.com/oauth2/authorize/naver'
}

const loginWithKakao = () => {
  loginForm.loading_k = true
  setTimeout(() => {
    loginForm.loading_k = false
    alert(`로그인 시도: ${loginForm.email}`)
  }, 1000)
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
.sky-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;

  background-image: url('@/common/assets/login/sky.svg');
  background-size: cover;
}
</style>
