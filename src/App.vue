<script>
export default {
  created () {
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

    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {}).catch(err => {
      console.error(err)
    })
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
