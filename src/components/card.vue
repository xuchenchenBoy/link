<template>
  <div class="card">
    <p class="title">{{name}}</p>
    <p class="desc">{{desc}}</p>
  </div>
</template>

<script>
export default {
  props: ['name', 'desc']
}
</script>

<style>
.card {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 500rpx;
  height: 800rpx;
  padding: 20rpx;
  margin: auto;
  background: #fff;
  border-radius: 5rpx;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.16), 0 0 0 1px rgba(0,0,0,.08);
}

.title {
  text-align: center;
  font-size: 32rpx;
  color: #343434;
}

.desc {
  line-height: 34rpx;
  font-size: 24rpx;
  color: #9B9B9B;
}
</style>
