<template>
  <div class="container detail-wrapper" >
    <card 
      v-for="(item, index) in lifeData.list"
      v-bind:key="item.id"
      @onShift="onShift" 
      v-bind:dataProvider="item" 
      v-bind:zIndex="-index" 
      v-bind:selected="index === selectIdx"
    />
    <div class="empty-card empty-card-1">
      <span v-if="isEnd">已翻看结束</span>
      <loading v-else />
    </div>
    <div class="empty-card empty-card-2"></div>
    <div class="empty-card empty-card-3"></div>
    <div class="bottom" v-show="lifeData.totalItem">
      <text class="size" key="2">{{lifeData.startIdx + selectIdx + 1}} / {{lifeData.totalItem}}</text>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import loading from '@/components/loading'
import { INIT_START_IDX, INIT_SIZE } from '@/constants'
import { getToken } from '@/utils/authorize'
import wxCloudSync from '@/utils/wxCloudSync'

export default {
  data () {
    return {
      lifeData: {
        list: [],
        size: INIT_SIZE,
        startIdx: INIT_START_IDX, // 下次进来，开始阅读的位置数
        totalItem: 0,
        backTotalItem: 0, // 当前返回的阅读量
      },
      selectIdx: 0, // 选择的卡片索引值
      requesting: false, // 是否正在请求列表
      collection: '', // 查寻的明细数据库名
      title: '',
      isEnd: false, // 是否全部翻完
    }
  },

  components: {
    card,
    loading
  },

  methods: {
    getList(startIdx = INIT_START_IDX, size = INIT_SIZE) {
      wx.cloud.callFunction({
        name: 'topicDetail',
        data: {
          startIdx,
          size,
          token: getToken(),
          collection: this.collection
        }
      }).then(res => {
        this.lifeData = { ...res.result, list: res.result.list || [] }
        this.selectIdx = 0
        this.requesting = false
      }).catch(err => {
        this.requesting = false
        wx.showToast({
          title: '请求失败，请稍后再试',
          icon: 'none'
        })
      })
    },

    // 切换下一页
    onShift() {
      if (this.requesting) return
      // this.lifeData.list.shift()
      this.selectIdx += 1
      const currentCount = this.lifeData.backTotalItem
      if (currentCount < INIT_SIZE) { // 阅读完所有卡片
        this.lifeData.list = []
        this.isEnd = true;
        return;
      }

      if (this.selectIdx >= currentCount) { // 阅读完请求的卡片
        this.lifeData.list = []
        this.requesting = true
        const startIdx = this.lifeData.startIdx + currentCount;
        this.getList(startIdx)
      }
    },

    // 记录当前阅读的卡片索引值
    async recordSkipIdx() {
      const startIdx = this.lifeData.startIdx + this.selectIdx
      await wx.cloud.callFunction({
        name: 'setTopicSkipIdx',
        data: {
          token: getToken(), 
          collection: `${this.collection}Record`, 
          startIdx
        }
      })
    },
  },

  onShareAppMessage(res) {
    const { title, collection } = this;
    return {
      title,
      path: `/pages/topicDetail/main?collection=${collection}&title=${title}`
    }
  },

  async mounted (e) {
    const { collection, title } = this.$root.$mp.query;
    wx.setNavigationBarTitle({
      title
    })
    this.collection = collection;
    this.title = title;
    try {
      // 获取上次浏览的卡片索引值
      const res = await wxCloudSync(
        'getTopicSkipIdx',
        {
          collection: `${this.collection}Record`
        }
      )
      const { startIdx } = res.result.data || {};
      this.getList(startIdx)
    } catch (e) {
      console.log(e)
    }
  },

  onHide() {
    this.recordSkipIdx()
  },

  onUnload() {
    this.recordSkipIdx()
  }
}
</script>

<style scoped>
.detail-wrapper {
  overflow: hidden;
}

.empty-card {
  position: absolute;
  left: 0;
  right: 0;
  padding: 40rpx 50rpx;
  margin: auto;
  background: #fff;
  border-radius: 7rpx;
  box-shadow: 0 2px 4px 2px rgba(215,215,215,0.50);
}

.empty-card-1 {
  top: 130rpx;
  z-index: 30;
  width: 500rpx;
  height: 660rpx;
  box-shadow: 0 2px 4px 2px rgba(215,215,215,0.20);
}

.empty-card-2 {
  top:145rpx;
  z-index:20;
  width:488rpx;
  height:660rpx;
}

.empty-card-3 {
  top:156rpx;
  z-index:10;
  width:464rpx;
  height:660rpx;
}

.bottom {
  position: fixed;
  left: 0;
  top: 960rpx;
  width: 100%;
  text-align: center;
  color: #9B9B9B;
  font-size: 28rpx;
}

.size {
  display: inline-block;
  padding: 8rpx 20rpx;
  box-shadow: 0rpx 2rpx 8rpx 0 rgba(0,0,0,.1);
  border-radius:7rpx;
  font-size: 26rpx;
  color: #9B9B9B;
}

.shift {
  padding: 0 40rpx;
  font-size: 34rpx;
  color: #4183c4;
}

.shift:active {
  color: #8cb9e6;
}
</style>
