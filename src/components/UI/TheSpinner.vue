<template>
  <div class="spin"></div>
</template>

<style scoped>
.spin {
  margin: 40px auto;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #1e9eda;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}
</style>
