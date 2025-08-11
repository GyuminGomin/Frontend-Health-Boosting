<template>
  <v-container class="fill-height d-flex align-center justify-center pa-0" fluid>
    <SkyBackground />
    <GoBack />
    <v-card class="mx-auto my-5 pa-4" max-width="500">
      <v-card-title class="text-5 mx-8">회원 정보</v-card-title>
      <v-card-text>
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
            @change="handleSelect"
          />

          <!-- 이름 입력 -->
          <v-text-field
            v-model="form.name"
            label="이름 또는 별명"
            required
            class="flex-grow-1"
            id="custom"
          ></v-text-field>
        </div>

        <!-- 아이디 -->
        <v-text-field v-model="form.userId" label="아이디" required></v-text-field>

        <!-- 이메일 + 인증 -->
        <v-text-field
          ref="emailRef"
          v-model="form.email"
          label="이메일"
          type="email"
          required
          append-inner-icon="mdi-email-check-outline"
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
          required
          append-inner-icon="mdi-phone-check-outline"
        ></v-text-field>

        <!-- 수정, 저장 버튼 -->
        <div>
          <v-btn
            block
            color="#1976D2"
            class="d-flex text-white signup-btn"
            size="small"
            type="submit"
          >
            저장
          </v-btn>
          <v-btn
            block
            color="#1976D2"
            class="d-flex text-white signup-btn"
            size="small"
            type="submit"
          >
            수정
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import SkyBackground from '@/common/components/background/SkyBackground.vue'
import GoBack from '@/common/components/GoBack.vue'
import { useImagePreview } from '@/common/composables/useImagePreview'
import { useAxios } from '@/common/api/useAxios.ts'
import { onMounted, reactive } from 'vue'

// import Swal from 'sweetalert2'

const {} = useAxios()

const {
  displaySrc: imagePreview,
  fileInput,
  selectedFiles,
  trigger: triggerImageUpload,
  handleSelect,
  reset: resetProfileImage,
  setPreviewFromUrl,
  removed, // true면 서버에서 프로필 이미지 삭제 처리
} = useImagePreview()

console.log(selectedFiles)

const form = reactive({
  userId: '',
  email: '',
  password: '',
  name: '',
  gender: '',
  phoneNumber: '',
  birthday: '',
})

onMounted(async () => {
  // const res = await get('/user/profile')
  // Object.assign(form, res)
  // setPreviewFromUrl(res.profileImageUrl)
})
</script>

<style scoped lang="scss">
.v-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
