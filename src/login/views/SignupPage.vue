<template>
  <v-container class="pa-0" fluid>
    <SkyBackground />
    <GoBack />
    <v-card class="mx-auto my-5 pa-4" max-width="500">
      <v-card-title class="text-h5">회원가입</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="signup" ref="formRef">
          <!-- 아이디 -->
          <v-text-field v-model="form.userId" label="아이디" required></v-text-field>
          <!-- 이메일 -->
          <v-text-field
            v-model="form.email"
            label="이메일"
            type="email"
            required
            append-inner-icon="mdi-email-check-outline"
            @click:append-inner="sendEmailVerification"
          ></v-text-field>
          <!-- 비밀번호 -->
          <v-text-field
            v-model="form.password"
            label="비밀번호"
            type="password"
            required
          ></v-text-field>
          <!-- 이름 또는 별명 -->
          <v-text-field v-model="form.name" label="이름 또는 별명" required></v-text-field>
          <!-- 성별 선택 -->
          <v-select
            v-model="form.gender"
            :items="['남성', '여성']"
            label="성별"
            required
          ></v-select>
          <!-- 휴대폰 번호 -->
          <v-text-field
            v-model="form.phoneNumber"
            label="휴대폰 번호"
            type="tel"
            required
            append-inner-icon="mdi-phone-check-outline"
            @click:append-inner="sendPhoneVerification"
          ></v-text-field>
          <!-- 생년월일 -->
          <v-text-field
            v-model="form.birthday"
            label="생년월일 선택"
            type="date"
            required
          ></v-text-field>
          <!-- 프로필 이미지 업로드 -->
          <v-file-input
            v-model="form.profileImage"
            label="프로필 이미지 (선택)"
            accept="image/*"
            prepend-icon="mdi-camera"
            show-size
          ></v-file-input>
          <!-- 약관 동의 -->
          <v-checkbox
            v-model="form.termsAccepted"
            label="이용 약관에 동의합니다."
            required
          ></v-checkbox>
          <!-- 회원가입 버튼 -->
          <v-btn
            block
            color="#1976D2"
            class="mt-4 text-white signup-btn"
            size="small"
            type="submit"
          >
            회원가입
          </v-btn>
        </v-form>
      </v-card-text>

      <v-divider class="my-2"></v-divider>

      <!-- <v-card-text class="text-center">
        <div>소셜 로그인</div>
        <v-btn block color="#4285F4" class="mt-2 text-white"> Google 로그인 </v-btn>
        <v-btn block color="#1EC800" class="mt-2 text-white"> Naver 로그인 </v-btn>
        <v-btn block color="#FEE500" class="mt-2 text-black"> Kakao 로그인 </v-btn>
      </v-card-text> -->
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
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import SkyBackground from '@/common/components/background/SkyBackground.vue'
import GoBack from '@/common/components/GoBack.vue'
import { ref } from 'vue'

const loginForm = ref({
  loading_g: false,
  loading_n: false,
  loading_k: false,
})
const formRef = ref()
const form = ref({
  userId: '',
  email: '',
  password: '',
  name: '',
  gender: '',
  phoneNumber: '',
  birthday: '',
  profileImage: null as File | null,
  termsAccepted: false,
})

// 회원가입 요청
const signup = () => {
  if (formRef.value?.validate()) {
    // api
  }
}
// 휴대폰 인증 요청
const sendPhoneVerification = () => {
  // 휴대폰 인증 요청
}

// 이메일 인증 요청
const sendEmailVerification = () => {
  // 이메일 인증 요청
}

const loginWithGoogle = async () => {
  loginForm.value.loading_g = true
  await window.electronAPI.invoke(
    'oauth2:open',
    'http://localhost:8282/oauth2/authorization/google',
  )
  loginForm.value.loading_g = false
}

const loginWithNaver = async () => {
  loginForm.value.loading_n = true
  await window.electronAPI.invoke('oauth2:open', 'http://localhost:8282/oauth2/authorization/naver')
  loginForm.value.loading_n = false
}

const loginWithKakao = async () => {
  loginForm.value.loading_k = true
  await window.electronAPI.invoke('oauth2:open', 'http://localhost:8282/oauth2/authorization/kakao')
  loginForm.value.loading_k = false
}
</script>

<style scoped lang="scss">
.v-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.signup-btn {
  min-height: 36px;
  font-size: 14px;
  font-weight: 500;
}
</style>
