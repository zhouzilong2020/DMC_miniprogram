// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

function getIntersection(list1, list2) {
  let _s2 = new Set(list2)
  return list1.filter(x => !_s2.has(x))
}

function getLastCheckTime() {
  const interval = {
    second: 30,
    date: 1,
  }
  var cur_date = new Date()
  return cur_date.setSeconds(cur_date.getDate() - interval.date)
}


// TODO：检查当前用户关联的项目动态，如果有新的问卷被发布，则该用户自动将该问卷拉取到自己的数据库中
// 流程：
// 获得当前用户上次登录时间，
// 在questionnaire 中查询从上次登录后的所有新问卷
// 对所有新问卷关联project进行查询
// 查看当前用户是否于每一个project关联
// 如果关联，则更新用户表
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const open_id = wxContext.OPENID

  var res = await db.collection('user').where({
    _openid: open_id
  }).get()
  const user_res = res.data[0]
  // console.log(user_res)

  var project_id_check_list = []
  for (var project_id of user_res.relevent_project_id_list) {
    // console.log(project_id)
    project_id_check_list.push(project_id)
  }
  for (var project_id of user_res.my_project_id_list) {
    project_id_check_list.push(project_id)
  }
  // console.log(project_id_check_list)

  const user_last_login_time = user_res.last_login_time
  res = await db.collection('project1').where({
    _id: _.in(project_id_check_list),
    // update_time: _.gte(user_last_login_time),
    status: _.gte(3) // 进入了投票后的阶段
  }).get()
  const project_res = res.data

  var questionnaire_check_list = []
  for (var project of project_res) {
    questionnaire_check_list.push(...project.relevant_questionnaire_id_list)
  }
  // 减去用户已经做过的
  const todo_list = user_res.todo_questionnaire_list
  const done_list = user_res.done_questionnaire_list
  questionnaire_check_list = getIntersection(questionnaire_check_list, todo_list)
  questionnaire_check_list = getIntersection(questionnaire_check_list, done_list)

  if (questionnaire_check_list.length) {
    const add_res = await db.collection('user')
      .doc(user_res._id)
      .update({
        data: {
          todo_questionnaire_list: _.push(questionnaire_check_list)
        }
      })
    return {
      add_res
    }
  } else {
    return {
      mes: 'nothing to be added'
    }
  }
}