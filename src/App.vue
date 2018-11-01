<script>
import { setToken, getToken } from '@/utils/authorize'
import wxAsync from '@/utils/wxAsync'

export default {
  async created () {
    if (!wx.cloud) {
      wx.showToast({
        title: '请使用最新版本的微信',
        icon: 'none'
      })
    } else {
      wx.cloud.init({
        traceUser: true
      })
    }
  }
}
</script>

<style>
page {
  height: 100%;
  background: #f8f8f8;
}

.container {
  height: 100%;
  box-sizing: border-box;
}
</style>
