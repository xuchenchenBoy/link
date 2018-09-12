<script>
export default {
  created () {
    if (!wx.cloud) {
      console.error('请使用最新版本的微信')
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
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
</style>
