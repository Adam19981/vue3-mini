<template>
  <div class="loading-progress-box">
    <div class="loading-progress">
      <span class="loading-progress-text">loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style scoped lang="scss">
.loading-progress-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100rpx;
}

.loading-progress {
  position: relative;
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  z-index: 1;
  overflow: hidden;
  text-align: center;
  line-height: 200rpx;

  &-text {
    color: rebeccapurple;
    opacity: 0;
    animation: loading-text-opacity 2s linear 0s infinite normal;
  }
}

.loading-progress:after {
  content: '';
  position: absolute;
  left: 10rpx;
  top: 10rpx;
  width: calc(100% - 20rpx);
  height: calc(100% - 20rpx);
  border-radius: 50%;
  z-index: -1;
  background: #fff;
}

.loading-progress:before {
  content: '';
  position: absolute;
  background: rebeccapurple;
  width: 200%;
  height: 200%;
  left: 50%;
  top: 50%;
  z-index: -2;
  transform-origin: 0 0;
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  to {
    transform: rotate(1turn);
  }
}
@keyframes loading-text-opacity {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
