<template>
  <v-container class="pa-0" fluid>
    <SkyBackground />
    <GoBack />
    <v-card class="mx-auto my-5 pa-4" max-width="500">
      <v-card-title class="text-h5 mx-8">Health Boost 회원가입</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="signup" ref="formRef">
          <!-- 프로필 이미지 + 이름 -->
          <div class="d-flex align-center mb-4">
            <!-- 클릭 가능한 이미지 미리보기 -->
            <v-avatar
              size="72"
              class="me-4 cursor-pointer"
              @click="triggerImageUpload"
              @contextmenu.prevent="resetProfileImage"
            >
              <template v-if="imagePreview">
                <v-img :src="imagePreview" alt="Profile Preview" cover />
              </template>
              <template v-else>
                <v-icon size="36">mdi-account-circle</v-icon>
              </template>
            </v-avatar>

            <!-- 이름 입력 -->
            <v-text-field
              v-model="form.name"
              label="이름 또는 별명"
              required
              class="flex-grow-1"
            ></v-text-field>

            <!-- 숨겨진 파일 input -->
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              accept="image/*"
              @change="onImageSelected"
            />
          </div>

          <!-- 아이디 -->
          <v-text-field v-model="form.userId" label="아이디" required></v-text-field>

          <!-- 이메일 + 인증 -->
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

          <!-- 성별 + 생일 한 줄에 정렬 -->
          <div class="d-flex flex-row gap-2">
            <v-select
              v-model="form.gender"
              :items="['남성', '여성']"
              label="성별"
              required
              class="flex-grow-1"
            ></v-select>
            <v-text-field
              v-model="form.birthday"
              label="생년월일"
              type="date"
              required
              class="flex-grow-1"
            ></v-text-field>
          </div>

          <!-- 휴대폰 -->
          <v-text-field
            v-model="form.phoneNumber"
            label="휴대폰 번호"
            type="tel"
            required
            append-inner-icon="mdi-phone-check-outline"
            @click:append-inner="sendPhoneVerification"
          ></v-text-field>

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
import Swal from 'sweetalert2'
import { ref, reactive } from 'vue'

// 기본 이미지 및 미리보기
const imagePreview = ref<string>('')
const fileInput = ref<HTMLInputElement | null>(null)

const triggerImageUpload = () => {
  fileInput.value?.click()
}

const resetProfileImage = () => {
  if (imagePreview.value) {
    Swal.fire({
      title: '이미지 초기화',
      text: '현재 프로필 이미지를 초기화하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '예',
      cancelButtonText: '아니오',
    }).then((result) => {
      if (result.isConfirmed) {
        imagePreview.value = ''
      }
    })
  }
}

const onImageSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const loginForm = reactive({
  loading_g: false,
  loading_n: false,
  loading_k: false,
})
const formRef = ref()
const form = reactive({
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
}

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
