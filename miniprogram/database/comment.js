const db = wx.cloud.database()
const _ = db.command

import {
  getAttrMapping
} from './utils'
import {
  tableKey
} from './table'

/**
 * 得到news相关的comment
 * @param {*} context 
 * @param {*} payload 
 */
export function getNewsComment(context, payload) {
  const comment = tableKey.comment
  return new Promise((resolve, reject) => {
    try {
      const _comment_ids = payload.relevent_comment_id
      db.collection(comment._name).orderBy(comment.create_time, 'desc').where({
        _id: _.in(_comment_ids)
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
 * 针对一则news发表comment
 * @param {*} context 
 * @param {*} payload 
 */
export function makeComment(context, payload) {
  const comment = tableKey.comment
  const news = tableKey.news
  return new Promise((resolve, reject) => {
    try {
      const _news_id = payload.news_id
      var _new_comment = getAttrMapping(comment, payload)
      db.collection(comment._name).add({
        data: {
          ..._new_comment
        },
        success: (res) => {
          const _new_comment_id = res.data._id
          // 向news中关联新数据
          db.collection(news._name).doc(_news_id).update({
            data: {
              relevent_comment_id: _.push(_new_comment_id)
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