<template>
  <div class="loading">
    <div class="loading-container">
      <div class="k-ball-holder3">
        <div class="k-ball7a"></div>
        <div class="k-ball7b"></div>
        <div class="k-ball7c"></div>
        <div class="k-ball7d"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  background-color: transparent;
  z-index: 99;
  font-size: 12px;

  .loading-container {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.k-ball-holder3{
  width: 30px;
  height: 30px;

  &>div{
    opacity: 0.9;
  }
}

.k-ball7a {
  border: 0;
  margin: 0;
  width: 11px;
  height: 11px;
  position: absolute;
  border-radius: 50%;
  animation: k-loadingO 2s ease infinite;
  background: #19a68c;
  animation-delay: -1.5s;
}
.k-ball7b {
  border: 0;
  margin: 0;
  width: 11px;
  height: 11px;
  position: absolute;
  border-radius: 50%;
  animation: k-loadingO 2s ease infinite;
  background: #f63d3a;
  animation-delay: -1s;
}
.k-ball7c {
  border: 0;
  margin: 0;
  width: 11px;
  height: 11px;
  position: absolute;
  border-radius: 50%;
  animation: k-loadingO 2s ease infinite;
  background: #fda543;
  animation-delay: -0.5s;
}
.k-ball7d {
  border: 0;
  margin: 0;
  width: 11px;
  height: 11px;
  position: absolute;
  border-radius: 50%;
  animation: k-loadingO 2s ease infinite;
  background: #4b9cdb;
}

@keyframes k-loadingO {
  0%,
  100% {
    transform: translate(0);
  }
  25% {
    transform: translate(160%);
  }
  50% {
    transform: translate(160%, 160%);
  }
  75% {
    transform: translate(0, 160%);
  }
}
</style>