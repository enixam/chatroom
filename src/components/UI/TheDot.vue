<template>
  <div id="wave">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
</template>

<style scoped>
#wave {
  text-align: center;
  width: 100%;
  height: 15px;
  margin-bottom: 15px;
}
#wave .dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-right: 3px;
  background: #303131;
  animation: wave 1.3s linear infinite;
}
#wave .dot:nth-child(2) {
  animation-delay: -1.1s;
}
#wave .dot:nth-child(3) {
  animation-delay: -0.9s;
}

@keyframes wave {
  0%,
  60%,
  100% {
    transform: initial;
  }
  30% {
    transform: translateY(-15px);
  }
}
</style>
