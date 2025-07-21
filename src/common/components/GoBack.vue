<template>
  <router-link to="/login">
    <v-btn
      class="btn-back"
      icon
      style="position: fixed; top: 16px; left: 16px; z-index: 1000; color: white"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
  </router-link>
</template>

<style scoped lang="scss">
.btn-back {
  background: transparent;
  color: white;
  font-size: 24px;
}
</style>
