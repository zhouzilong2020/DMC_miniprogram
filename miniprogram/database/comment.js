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
  return new Promise((resolve, reject) => {
    try {
      const _comment_ids = payload.relevant_comment_id
      db.collection('comment').orderBy('create_time', 'desc').where({
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
  return new Promise((resolve, reject) => {
    try {
      const _news_id = payload.news_id
      var _new_comment = getAttrMapping(comment, payload)
      db.collection('comment').add({
        data: {
          ..._new_comment
        },
        success: (res) => {
          const _new_comment_id = res.data._id
          // 向news中关联新数据
          db.collection('news').doc(_news_id).update({
            data: {
              relevant_comment_id_list: _.push(_new_comment_id)
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