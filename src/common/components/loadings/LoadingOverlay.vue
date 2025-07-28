<template>
  <div v-if="isLoading" class="overlay">
    <div class="spinner"></div>
    <div class="text">처리 중입니다...</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const globalStore = useGlobalStore()
const isLoading = computed(() => globalStore.isLoading)
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.spinner {
  width: 50px;
  height: 50px;
  border: 6px solid #ccc;
  border-top-color: #3cb043;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
.text {
  margin-top: 10px;
  color: white;
  font-size: 16px;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
