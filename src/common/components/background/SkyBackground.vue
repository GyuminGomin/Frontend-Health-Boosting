<template>
  <div class="sky-wrapper"></div>
</template>

<style scoped lang="scss">
.sky-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;

  background-image: url('@/common/assets/login/sky.svg');
  background-size: cover;
}
</style>
