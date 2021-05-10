// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command


function getLastCheckTime() {
  const interval = 30
  var cur_date = new Date()
  return cur_date.setSeconds(cur_date.getSeconds() - interval)
}
// "triggers": [{
  //   "name": "messageTrigger",
  //   "type": "timer",
  //   "config": "*/5 * * * * * *"
  // }],

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const no_before_this_time = getLastCheckTime()
  var result = null
  var mes = null
  return await db.collection('0001test')
    .where({
      create_time: _.gte(no_before_this_time)
    })
    .get()



}