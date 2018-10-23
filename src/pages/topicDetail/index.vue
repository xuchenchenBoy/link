<template>
  <div class="container detail-wrapper" >
    <!-- <card 
      v-for="(item, index) in lifeData.list"
      v-bind:key="item.id"
      @onShift="onShift" 
      v-bind:dataProvider="item" 
      v-bind:zIndex="-index" 
      v-bind:selected="selectIdx === index"
    /> -->
    <div class="empty-card empty-card-1"><loading /></div>
    <div class="empty-card empty-card-2"></div>
    <div class="empty-card empty-card-3"></div>
    <div class="bottom">
      <text key="2">{{selectIdx + 1}}/{{lifeData.totalItem}}</text>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import loading from '@/components/loading'
import { INIT_PAGE, INIT_SIZE } from '@/constants'

export default {
  data () {
    return {
      lifeData: {
        list: [],
        size: INIT_SIZE,
        page: INIT_PAGE,
        totalItem: 0,
        totalPage: 0
      },
      selectIdx: 0,
      requesting: false,
      collection: '', // 查寻的明细数据库名
      title: '',
    }
  },

  components: {
    card,
    loading
  },

  methods: {
    getList(page = INIT_PAGE, size = INIT_SIZE) {
      wx.cloud.callFunction({
        name: 'topicDetail',
        data: {
          page,
          size,
          collection: this.collection
        }
      }).then(res => {
        this.lifeData = { ...res.result, list: this.lifeData.list.concat(res.result.list || []) }
        this.requesting = false
      }).catch(err => {
        this.requesting = false
        wx.showToast({
          title: '请求失败，请稍后再试',
          icon: 'none'
        })
      })
    },

    onShift() {
      if (this.requesting) return
      if (this.selectIdx >= this.lifeData.totalItem) return
      this.selectIdx += 1
      const { page, size } = this.lifeData
      const currentCount = (page + 1) * size
      if (this.selectIdx >= currentCount) {
        this.requesting = true
        this.getList(page + 1, size)
      }
    }
  },

  onShareAppMessage(res) {
    const { title, collection } = this;
    return {
      title,
      path: `/pages/topicDetail/main?collection=${collection}&title=${title}`
    }
  },

  mounted (e) {
    const { collection, title } = this.$root.$mp.query;
    wx.setNavigationBarTitle({
      title
    })
    this.collection = collection;
    this.title = title;
    this.getList()
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
  box-shadow: 0rpx 2rpx 20rpx 0 rgba(0,0,0,.17);
}

.empty-card-1 {
  top: 130rpx;
  z-index: 30;
  width: 500rpx;
  height: 660rpx;
}

.empty-card-2 {
  top: 120rpx;
  z-index: 20;
  width: 480rpx;
  height: 660rpx;
}

.empty-card-3 {
  top: 110rpx;
  z-index: 10;
  width: 460rpx;
  height: 660rpx;
}

.bottom {
  width: 100%;
  text-align: center;
  color: #9B9B9B;
  font-size: 28rpx;
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
