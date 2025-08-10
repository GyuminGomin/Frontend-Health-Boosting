<template>
  <v-container class="fill-height d-flex align-center justify-center pa-0" fluid>
    <SkyBackground />
    <GoBack />
    <v-card class="mx-auto my-5 pa-4" max-width="500">
      <v-card-title></v-card-title>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import SkyBackground from '@/common/components/background/SkyBackground.vue'
import GoBack from '@/common/components/GoBack.vue'
import { useAxios } from '@/common/api/useAxios.ts'

// import Swal from 'sweetalert2'

const {} = useAxios()
</script>

<style scoped lang="scss">
.v-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
