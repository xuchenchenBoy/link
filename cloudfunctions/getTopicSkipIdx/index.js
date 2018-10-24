// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { token, collection } = event;
  try {
    const record = await db.collection(collection).doc(token).get();
    return record;
  } catch (e) {
    return null;
  }
}