<template>
  <v-dialog :model-value="props.visible" max-width="400">
    <v-card class="pa-4">
      <v-card-title class="text-h6">이메일 인증</v-card-title>

      <v-card-text>
        <p class="mb-2">
          입력하신 이메일 <strong>{{ email }}</strong
          >로 인증 코드를 보냈습니다.
        </p>
        <p class="text-caption mb-4">아래에 6자리 인증 코드를 입력해 주세요.</p>

        <v-text-field v-model="code" label="인증 코드" maxlength="6" counter autofocus required />

        <p class="text-caption text-red mt-2">남은 시간: {{ formattedTime }}</p>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text @click="cancel">취소</v-btn>
        <v-btn color="primary" @click="confirm" :disabled="!isCodeValid">인증 완료</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { useAxios } from '@/common/api/useAxios'
import Swal from 'sweetalert2'

const { post, del } = useAxios()

interface Props {
  visible: boolean
  email: string
  disabled: boolean
}
const props = defineProps<Props>()

const emit = defineEmits(['update:visible', 'update:disabled'])

// 코드 입력
const code = ref('')

// 유효성 체크 (6자리 숫자)
const isCodeValid = computed(() => /^\d{6}$/.test(code.value))

// 타이머 관련
const totalSeconds = ref(5 * 60)
const timer = ref<number | null>(null)

const formattedTime = computed(() => {
  const min = Math.floor(totalSeconds.value / 60)
    .toString()
    .padStart(2, '0')
  const sec = (totalSeconds.value % 60).toString().padStart(2, '0')
  return `${min}:${sec}`
})

const startTimer = () => {
  stopTimer()
  totalSeconds.value = 5 * 60
  timer.value = setInterval(() => {
    if (totalSeconds.value > 0) {
      totalSeconds.value--
    } else {
      cancel()
    }
  }, 1000)
}

const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

// 인증 확인
const confirm = async () => {
  await post<boolean>('/signup/verify-code', {
    email: props.email,
    code: code.value,
  }).finally(() => {
    stopTimer()
    emit('update:visible', false)
  })
  emit('update:disabled', true)

  Swal.fire({
    title: '인증 성공',
  })
}

// 인증 취소
const cancel = async () => {
  stopTimer()
  await del('/signup/cancel-verification', { data: { email: props.email } })
  emit('update:visible', false)
}

// 다이얼로그 열릴 때 타이머 시작
watch(
  () => props.visible,
  (val) => {
    if (val) {
      code.value = ''
      startTimer()
    } else {
      stopTimer()
    }
  },
)

onBeforeUnmount(stopTimer)
</script>
