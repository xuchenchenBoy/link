<template>
  <div class="wrapper" :style="{zIndex: zIndex + 99 }">
    <div :style="{transform: 'translate(' + touch.touchMoveX + 'px,' +  touch.touchMoveY + 'px)', boxShadow: selected ? '0rpx 2rpx 20rpx 0 rgba(0,0,0,.17)' : 'none' }" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove" @touchend.prevent="touchEnd" ref="back" class="card">
      <template v-if="dataProvider.name">
        <image class="avatar" v-bind:src="dataProvider.avatar"></image>
        <p class="title">{{dataProvider.name}}</p>
        <view class="desc">
           {{dataProvider.comment}}
          <p class="time">{{dataProvider.time}}</p>
        </view>
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
    },
    zIndex: Number,
    selected: Boolean
  },

  data() {
    return {
      touch: {
        startX: 0,
        startY: 0,
        touchMoveY: 0,
        touchMoveX: 0,
        direction: ''
      }
    }
  },

  methods: {
    touchStart(e) {
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
      this.touch.touchMoveX = 0;
      this.touch.touchMoveY = 0;
    },
    touchMove(e) {
      const touch = e.touches[0]
      this.touch.touchMoveX = touch.pageX - this.touch.startX
      this.touch.touchMoveY = touch.pageY - this.touch.startY
    },
    touchEnd() {
      if (Math.abs(this.touch.touchMoveX) > 100) {
        this.touch.direction = this.touch.touchMoveX > 0 ? 'right' : 'left';
        this.translate({ 
          fromPosX: this.touch.touchMoveX, 
          toPosX: this.windowW, 
          duration: 200, 
          direction: this.touch.direction
        })
      } else {
        this.touch.touchMoveX = 0;
        this.touch.touchMoveY = 0;
      }
      this.touch.startX = 0
      this.touch.startY = 0
    },
    translate({ fromPosX, toPosX, duration, direction }) {
      const startTime = Date.now();
      const run = () => {
        setTimeout(() => {
          const nowTime = Date.now();
          let percent = (nowTime - startTime) / duration;
          if (percent >= 1) {
            percent = 1;
            this.touch.direction = '';
            this.$emit('onShift')
          }
          const posOrNeg = direction === 'left' ? -1 : 1;
          this.touch.touchMoveX = toPosX * percent * posOrNeg + fromPosX;
          if (percent < 1) {
            run()
          } 
        }, 100);
      }
      run()
    }
  },

  mounted() {
    this.windowW = wx.getSystemInfoSync().windowWidth;
  }
}
</script>

<style scoped>
.wrapper {
  position: fixed;
  z-index:99;
  width: 100%;
  padding-top: 130rpx;
  padding-bottom: 50rpx;
}

.card {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  width: 500rpx;
  height: 660rpx;
  padding: 40rpx 50rpx;
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
  font-size: 32rpx;
  color: #343434;
}

.desc {
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
