// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
const db = cloud.database()
const _ = db.command

// 由于小程序客户端对数据的访问权限有严格的控制，一些写的操作需要放到服务器端来完成，客户端对其进行调用
/**
 * 云函数入口函数
 * @param {Object} event 前端调用时的传参对象
 * @param {*} context 
 */
exports.main = async (event, context) => {
  try {
    // 如果前端传递的是字符串，需要服务器端进行解析
    if (typeof (event.data) == String) {
      event.data = eval('(' + event.data + ')')
    }
    console.log(cloud)
    return await db.collection(event.collection).doc(event.doc)
      .update({
        data: {
          ...event.data
        }
      })
  } catch (e) {
    console.log(e)
  }
}