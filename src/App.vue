<template>
  <v-app>
    <router-view />
    <LoadingOverlay />
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoadingOverlay from '@/common/components/loadings/LoadingOverlay.vue'
</script>

<style scoped></style>
