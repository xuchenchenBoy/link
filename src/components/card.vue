<template>
  <div class="wrapper">
    <div class="card">
      <image class="avatar" v-bind:src="avatar"></image>
      <p class="title">{{name}}</p>
      <scroll-view class="desc" scroll-y>
        {{comment}}
      </scroll-view>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'comment', 'avatar']
}
</script>

<style>
.wrapper {
  position: relative;
  width: 100%;
}

.card {
  position: absolute;
  top: 130rpx;
  left: 0;
  right: 0;
  z-index: 99;
  width: 500rpx;
  height: 800rpx;
  padding: 20rpx 40rpx;
  margin: auto;
  background: #fff;
  border-radius: 7rpx;
  box-shadow: 0rpx 2rpx 20rpx 0 rgba(0,0,0,.17);
}

.avatar {
  display: block;
  width: 80rpx;
  height: 80rpx;
  margin: 0 auto;
  margin-bottom: 10rpx;
  border-radius: 100%;
}

.title {
  padding-bottom: 20rpx;
  text-align: center;
  font-size: 34rpx;
  color: #343434;
}

.desc {
  height: 610rpx;
  overflow-y: auto;
  line-height: 40rpx;
  font-size: 28rpx;
  color: #9B9B9B;
}
</style>
