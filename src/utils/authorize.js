
export function setToken(val) {
  wx.setStorageSync('token', val)
}

export function getToken() {
  return wx.getStorageSync('token')
}