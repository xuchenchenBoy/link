import { setToken, getToken } from '@/utils/authorize'

export default async function wxCloudAsync(name, data) {
  const token = getToken()
  if (token) {
    return await wx.cloud.callFunction({
      name,
      data: { 
        token: token,
        ...data
      }
    })
  } else {
    const res = await wx.cloud.callFunction({
      name: 'login'
    })
    const { result } = res;
    const { appId, openId } = result || {};
    const token = `${appId}${openId}`;
    setToken(token)
    return await wx.cloud.callFunction({
      name,
      data: { 
        token: token,
        ...data
      }
    })
  }
}