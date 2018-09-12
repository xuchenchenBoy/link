// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 获取现状表的列表
exports.main = async (event, context) => {
  const { page = 0, size = 10 } = event;
  try {
    const listRes = await db.collection('life')
      .limit(size)
      .skip(page * size)
      .orderBy('id', 'asc')
      .get();

    const list = listRes.data;
    const countRes = await db.collection('life').count();
    const totalItem = countRes.total;
    const totalPage = Math.ceil(totalItem / size);

    return {
      list,
      page,
      size,
      totalItem,
      totalPage
    }
  } catch (e) {
    console.error(e)
  }
}