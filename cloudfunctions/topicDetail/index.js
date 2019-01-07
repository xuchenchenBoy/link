// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 获取现状表的列表
exports.main = async (event, context) => {
  const { startIdx = 1, size = 10, collection, orderBy='asc' } = event;
  try {
    const listRes = await db.collection(collection)
      .limit(size)
      .skip(startIdx)
      .orderBy('_id', orderBy)
      .get();

    const list = listRes.data;
    const backTotalItem = list.length;
    const countRes = await db.collection(collection).count();
    const totalItem = countRes.total;

    return {
      list,
      backTotalItem,
      startIdx,
      size,
      totalItem
    }
  } catch (e) {
    console.error(e)
  }
}