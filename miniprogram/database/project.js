const db = wx.cloud.database();
const _ = db.command
import {
  getAttrMapping
} from './utils'
import {
  tableKey
} from './table'


/**
 * 得到用户发布和关联的项目数据
 * @param {*} context 
 * @param {*} payload 
 */
export function getReleventPublishedProject(context, payload) {
  const project = tableKey.project
  return new Promise((resolve, reject) => {
    try {
      var _project_ids = payload.relevent_project_id.concat(payload.published_project_id)
      db.collection(project._name).orderBy(project.update_time, 'asc').where({
        _id: _.in(_project_ids)
      }).get({
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * 用户添加一个新项目, 向project，user表中插入新的数据
 * @param {*} context user_id
 * @param {*} payload 由需要上传的project所有的属性，这里的img中的url应该是已经上传完毕的云数据库中的url
 */
export function publishProject(context, payload) {
  const project = tableKey.project
  const user = tableKey.user

  return new Promise((resolve, reject) => {
    try {
      var _user_id = payload.user_id
      if (!_user_id) {
        reject('no user_id')
      }
      var _new_project = getAttrMapping(project, {
        ...payload,
        // 改写user_id
        [project.publish_user_id]: _user_id
      })
      // 更新project 特殊字段
      _new_project[project.status_time] = _new_project[project.create_time]
      _new_project[project.status] = 0

      db.collection(project._name)
        .add({
          data: {
            ..._new_project
          },
          success: (res) => {
            var _new_project_id = _res.data._id
            // 向user表中添加该项目
            db.collection(user._name).doc(_user_id).update({
              data: {
                [user.my_project_id]: _.push(_new_project_id),
                [user.update_time]: new Date()
              },
              success: (res) => {
                resolve(res)
              },
              fail: (err) => {
                reject(err)
              }
            })
          },
          fail: (err) => {
            reject(err)
          }
        })
    } catch (err) {
      reject(err)
    }
  })
}