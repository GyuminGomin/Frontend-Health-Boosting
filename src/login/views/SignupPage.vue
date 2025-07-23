<template>
  <v-container class="fill-height d-flex align-center justify-center pa-0" fluid>
    <SkyBackground />
    <GoBack />
    <v-card class="mx-auto my-5 pa-4" max-width="500">
      <v-card-title class="text-h5 mx-8">Health Boost 회원가입</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="signup" ref="formRef">
          <!-- 프로필 이미지 + 이름 -->
          <div class="d-flex align-center mt-4">
            <!-- 클릭 가능한 이미지 미리보기 -->
            <v-avatar
              size="72"
              class="me-4 cursor-pointer mt-n7"
              @click="triggerImageUpload"
              @contextmenu.prevent="resetProfileImage"
            >
              <template v-if="imagePreview">
                <v-img :src="imagePreview" alt="Profile Preview" cover />
              </template>
              <template v-else>
                <v-icon size="72">mdi-account-circle</v-icon>
              </template>
            </v-avatar>

            <!-- 숨겨진 파일 input -->
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              accept="image/*"
              @change="onImageSelected"
            />

            <!-- 이름 입력 -->
            <v-text-field
              v-model="form.name"
              label="이름 또는 별명"
              :rules="nameRule"
              required
              class="flex-grow-1"
              id="custom"
            ></v-text-field>
          </div>

          <!-- 아이디 -->
          <v-text-field
            v-model="form.userId"
            label="아이디"
            :rules="userIdRule"
            required
          ></v-text-field>

          <!-- 이메일 + 인증 -->
          <v-text-field
            v-model="form.email"
            label="이메일"
            type="email"
            :rules="emailRule"
            required
            append-inner-icon="mdi-email-check-outline"
            @click:append-inner="sendEmailVerification"
          ></v-text-field>

          <!-- 비밀번호 -->
          <v-text-field
            v-model="form.password"
            label="비밀번호"
            type="password"
            :rules="passwordRule"
            required
          ></v-text-field>

          <!-- 성별 + 생일 한 줄에 정렬 -->
          <div class="d-flex flex-row gap-2">
            <v-select
              v-model="form.gender"
              :items="[
                { text: '남성', value: 'M' },
                { text: '여성', value: 'F' },
              ]"
              item-title="text"
              item-value="value"
              label="성별"
              required
              class="flex-grow-1"
              chips
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
            :rules="phoneNumberRule"
            required
            append-inner-icon="mdi-phone-check-outline"
            @click:append-inner="sendPhoneVerification"
            @input="onPhoneNumberInput"
          ></v-text-field>

          <!-- 약관 동의 -->
          <v-checkbox
            v-model="form.termsAccepted"
            label="이용 약관에 동의합니다."
            required
          ></v-checkbox>

          <!-- 회원가입 버튼 -->
          <v-btn block color="#1976D2" class="text-white signup-btn" size="small" type="submit">
            회원가입
          </v-btn>
        </v-form>
      </v-card-text>

      <OAuth2LoginButton />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import SkyBackground from '@/common/components/background/SkyBackground.vue'
import GoBack from '@/common/components/GoBack.vue'
import OAuth2LoginButton from '@/common/components/oAuth2/OAuth2LoginButton.vue'
import { useImagePreview } from '@/common/composables/useImagePreview'
import { useValidationRules } from '@/common/composables/useValidationRules'
import { ref, reactive } from 'vue'

const {
  preview: imagePreview,
  fileInput,
  trigger: triggerImageUpload,
  handleSelect: onImageSelected,
  reset: resetProfileImage,
} = useImagePreview()

const { nameRule, userIdRule, emailRule, passwordRule, phoneNumberRule } = useValidationRules()

const formRef = ref()
const form = reactive({
  userId: '',
  email: '',
  password: '',
  name: '',
  gender: 'M',
  phoneNumber: '',
  birthday: '',
  profileImage: null as File | null,
  termsAccepted: false,
})

const onPhoneNumberInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/\D/g, '') // 숫자만 남김

  if (value.length <= 3) {
    form.phoneNumber = value
  } else if (value.length <= 7) {
    form.phoneNumber = `${value.slice(0, 3)}-${value.slice(3)}`
  } else {
    form.phoneNumber = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`
  }
}

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
