// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { token, collection, startIdx } = event;
  const latestStramp = Date.now()
  let record;
  try {
    record = await db.collection(collection).doc(token).get();
  } catch (e) {
    record = null;
  }

  if (record) {
    await db.collection(collection).doc(token).update({
      data: {
        latestStramp,
        startIdx
      }
    })
  } else {
    await db.collection(collection).add({
      data: {
        latestStramp,
        startIdx,
        _id: token
      }
    })
  }
}