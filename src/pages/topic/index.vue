<template>
  <div v-if="list.length" class="wrapper">
    <div class="card" v-for="item in list" :key="item.title" v-on:click="goDetail(item.fromCollection, item.title, item.orderBy, item.iconUrl)" >
      <p class="title">{{item.title}}</p>
      <p class="from">问答来源：{{item.from}}</p>
      <img class="ornament" :src="item.iconUrl" alt="icon">
    </div>
  </div>
  <loading v-else />
</template>

<script>
import loading from '@/components/loading'

  export default {
    data() {
      return {
        list: []
      }
    },

    components: {
      loading
    },

    methods: {
      getTopic() { // 获取题目
        wx.cloud.callFunction({
          name: 'topic'
        }).then((res) => {
          this.list = res.result.list
        }).catch(() => {
          wx.showToast({
            title: '请求失败，请稍后重试',
            icon: 'none'
          })
        })
      },
      goDetail(collection, title, orderBy, iconUrl) {
        wx.navigateTo({
          url: `/pages/topicDetail/main?collection=${collection}&title=${title}&orderBy=${orderBy}&iconUrl=${iconUrl}`
        })
      }
    },

    onShareAppMessage(res) {
      const { title, collection } = this;
      return {
        title: '有意思的你和我',
        path: `/pages/topic/main`
      }
    },

    created() {
      this.getTopic()
    }
  }
</script>

<style scoped lang="less">
  .wrapper {
    padding-top: 50rpx;
  }

  .card {
    position: relative;
    width: 630rpx;
    padding: 50rpx 40rpx 20rpx;
    margin: 0 auto 35rpx;
    font-size: 32rpx;
    background: #fff;
    box-shadow: 0 2px 4px 3px rgba(241,237,237,0.50);
    border-radius: 10rpx;

    &:active {
      background: rgba(255, 255, 255, .3);
      box-shadow: 0 1rpx 8rpx 0 rgba(0,0,0,.17);
    }
  }

  .ornament {
    position: absolute;
    right:26rpx;
    top:18px;
    width:66rpx;
    height:99rpx;
  }

  .title {
    padding-bottom: 20rpx;
    line-height: 42rpx;
  }

  .from {
    text-align: right;
    font-size: 24rpx;
    color: #9B9B9B;
  }
</style>