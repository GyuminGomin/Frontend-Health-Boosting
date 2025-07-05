<template>
  <div ref="lottieContainer" class="lottie" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import lottie from 'lottie-web'

const lottieContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  lottie.loadAnimation({
    container: lottieContainer.value!,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/assets/h-coin-rotate.json', // 생성된 파일 경로
  })
})
</script>

<style scoped>
.lottie {
  width: 150px;
  height: 150px;
  margin: 0 auto;
}
</style>
