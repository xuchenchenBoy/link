<template>
  <div class="container" >
    <card v-for="item in lifeData.list" v-bind:key="item.id" v-bind:name="item.name" v-bind:desc="item.desc" />
  </div>
</template>

<script>
import card from '@/components/card'
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
      }
    }
  },

  components: {
    card
  },

  methods: {
    getList(page = INIT_PAGE, size = INIT_SIZE) {
      wx.cloud.callFunction({
        name: 'life',
        data: {
          page,
          size
        }
      }).then(res => {
        this.lifeData = res.result
      }).catch(err => {
        console.error(err)
      })
    }
  },

  created () {
    this.getList()
  }
}
</script>

<style scoped>
</style>
