<template>
  <div v-show="showCard" class="wrapper" :style="{zIndex: zIndex + 99 }">
    <div :style="{transform: 'translate(' + touch.touchMoveX + 'px,' +  touch.touchMoveY + 'px)', boxShadow: selected ? '0px 1px 4px 0 rgba(0,0,0,.1)' : 'none' }" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove" @touchend.prevent="touchEnd" ref="back" class="card">
      <img class="ornament" src="/static/imgs/flower.png" alt="">
      <template v-if="dataProvider.name">
        <view class="avatar-wrapper"><image class="avatar" v-bind:src="dataProvider.avatar"></image></view>
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
    dataProvider: { // 卡片内的信息
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
        direction: '', // 滑动的方位
      },
      showCard: true, // 是否显示卡片
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
      if (Math.abs(this.touch.touchMoveX) > 100) { // 偏移量大于100
        this.touch.direction = this.touch.touchMoveX > 0 ? 'right' : 'left';
        this.translate({ 
          fromPosX: this.touch.touchMoveX, 
          toPosX: this.windowW, 
          duration: 350, 
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
          if (percent >= 1) { // 切换下一页
            this.showCard = false;
            percent = 1;
            this.touch.direction = '';
            this.$emit('onShift')
          }
          const posOrNeg = direction === 'left' ? -1 : 1;
          this.touch.touchMoveX = toPosX * percent * posOrNeg + fromPosX;
          if (percent < 1) { // 移除动作
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
  width: 482rpx;
  height: 660rpx;
  padding: 40rpx 50rpx;
  margin: auto;
  background: #fff;
  border-radius: 7rpx;
  box-shadow: 0 2px 3px 2px rgba(215,215,215,0.12);
}

.ornament {
  position: absolute;
  left:40rpx;
  bottom:50rpx;
  z-index:9999;
  width:80rpx;
  height:123rpx;
}

.avatar-wrapper {
  width: 80rpx;
  height: 80rpx;
  margin: 0 auto;
  margin-bottom: 5rpx;
  border-radius: 100%;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
}

.title {
  padding-bottom: 20rpx;
  text-align: center;
  font-size: 32rpx;
  color: #343434;
}

.desc {
  height:500rpx;
  overflow:auto;
  line-height: 40rpx;
  font-size: 28rpx;
  color: #9B9B9B;
  word-break:break-all;
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
