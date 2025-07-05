<template>
  <div class="shine-wrapper">
    <img src="../assets/loading/HCoin2.png" class="base-image" />
    <div class="shine-overlay" />
  </div>
</template>

<style scoped lang="scss">
.shine-wrapper {
  position: relative;
  width: 150px;
  height: 150px;
  overflow: hidden;
}

.base-image {
  width: 100%;
  height: auto;
  display: block;
}

.shine-overlay {
  position: absolute;
  top: 0;
  left: -150%;
  width: 150%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shine-move 2.5s linear infinite;
  pointer-events: none;
}

@keyframes shine-move {
  0% {
    left: -150%;
  }
  100% {
    left: 150%;
  }
}
</style>
