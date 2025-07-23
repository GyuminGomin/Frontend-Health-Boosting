<template>
  <v-divider class="my-2"></v-divider>
  <div class="text-center text-caption mb-2">SNS 계정으로 로그인</div>

  <div class="d-flex flex-column mx-4" style="gap: 5px">
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
      :loading="loginForm.loading_n"
      @click="loginWithNaver"
    >
      <v-icon start size="small">mdi-leaf</v-icon>
      Naver 로그인
    </v-btn>
    <v-btn
      block
      color="#FEE500"
      class="text-black"
      size="small"
      :loading="loginForm.loading_k"
      @click="loginWithKakao"
    >
      <v-icon start size="small">mdi-chat</v-icon>
      Kakao 로그인
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const loginForm = reactive({
  loading_g: false,
  loading_n: false,
  loading_k: false,
})

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
