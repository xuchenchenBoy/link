<template>
  <div class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>

<script type="text/javascript">
  export default {
   
  }
</script>

<style lang="less" scoped>
.spinner {
  margin: 200rpx auto 0;
  width: 300rpx;
  text-align: center;
}

.spinner > div {
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, .17);
  border-radius: 100%;
  display: inline-block;
  transform: scale(0);
  -webkit-animation: bouncedelay 1.5s infinite ease-in-out;
  animation: bouncedelay 1.5s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.spinner .bounce1 {
  -webkit-animation-delay: 0.16s;
  animation-delay: 0.16s;
}

.spinner .bounce2 {
  -webkit-animation-delay: 0.32s;
  animation-delay: 0.32s;
}

.spinner .bounce3 {
  -webkit-animation-delay: 0.48s;
  animation-delay: 0.48s;
}

@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>