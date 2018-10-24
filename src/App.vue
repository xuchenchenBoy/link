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
    
    // 未记录用户
    if (!getToken()) {
      try {
        const res = await wx.cloud.callFunction({
          name: 'login'
        })
        const { result } = res;
        const { appId, openId } = result || {};
        const token = `${appId}${openId}`;
        setToken(token)
      } catch (e) {
        console.log('e====', e)
      }
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
