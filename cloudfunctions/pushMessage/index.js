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
  const interval = {
    second: 30,
    date: 1,
  }
  var cur_date = new Date()
  return cur_date.setSeconds(cur_date.getDate() - interval.date)
}


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const no_before_this_time = getLastCheckTime()
  var succ = true
  var new_questionnaire_res_list = await db.collection('questionnaire1')
    .where({
      is_pushed_message: false
    })
    .get()
  var need_update_list = []
  for (var new_questionnaire in new_questionnaire_res_list) {
    need_update_list.push({
      project_id: new_questionnaire.relevant_project_id_list,
      questionnaire_id: new_questionnaire._id
    })
  }
  for (var need_update in need_update_list) {
    const project_id = need_update.project_id
    const questionnaire_id = need_update.questionnaire_id
    const result = await db.runTransaction(async transaction => {
      const update_questionnaire_res = await transaction.collection('questionnaire1')
        .doc(String.valueOf(questionnaire_id))
        .update({
          data: {
            is_pushed_message: true
          }
        })
      const get_project_res = await transaction.collection('project1')
        .doc(String.valueOf(project_id))
        .get()
      const user_id_list = get_project_res.relevent_user_id_list
      // 对所有的user_id_list 进行推送消息
      for (var user_id in user_id_list) {
        const update_user_res = await transaction.collection('user')
          .doc(String.valueOf(user_id))
          .update({
            data: {
              todo_questionnarie_id_list: _.push(questionnaire_id)
            }
          })
      }
    })
  }
  return data
}