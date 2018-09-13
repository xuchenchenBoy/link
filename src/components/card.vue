<template>
  <div class="wrapper">
    <div class="card">
      <template v-if="dataProvider.name">
        <image class="avatar" v-bind:src="dataProvider.avatar"></image>
        <p class="title">{{dataProvider.name}}</p>
        <scroll-view class="desc" scroll-y>
          {{dataProvider.comment}}
          <p class="time">{{dataProvider.time}}</p>
        </scroll-view>
      </template>
      <div class="no-data" v-else>加载中...</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    comment: String,
    avatar: String,
    dataProvider: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style scoped>
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

.time {
  padding-top: 30rpx;
  text-align: right;
  font-size: 24rpx;
  color: #9B9B9B;
}

.no-data {
  padding-top: 200rpx;
  text-align: center;
  font-size: 30rpx;
  color: #9B9B9B;
}
</style>
