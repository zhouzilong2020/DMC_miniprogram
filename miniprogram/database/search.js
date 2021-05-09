const db = wx.cloud.database();

import {
  tableKey
} from './table'

export function getKeyword(keyword) {
  return new Promise(async (resolve, reject) => {
    const result = {
      project: null,
      designer: null,
      example_project: null,
    }
    try {
      db.collection('project')
        .where({
          code: {
            $regex: `.*${keyword}.*`,
            $options: '1'
          }
        })
        .orderBy('update_time', 'asc')
        .get({
          success: (res) => {
            result.project = res.data
            if (result.project && result.designer && result.example_project) {
              resolve(result)
            }
          },
          fail: (err) => {
            reject(err)
          }
        })
      db.collection('designer')
        .orderBy('update_time', 'asc')
        .where({
          code: {
            $regex: `.*${keyword}.*`,
            $options: '1'
          }
        })
        .get({
          success: (res) => {
            result.designer = res.data
            if (result.project && result.designer && result.example_project) {
              resolve(result)
            }
          },
          fail: (err) => {
            reject(err)
          }
        })
      db.collection('example_project')
        .orderBy('update_time', 'asc')
        .where({
          code: {
            $regex: `.*${keyword}.*`,
            $options: '1'
          }
        })
        .get({
          success: (res) => {
            result.designer = res.data
            if (result.project && result.designer && result.example_project) {
              resolve(result)
            }
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