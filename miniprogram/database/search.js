const db = wx.cloud.database();

import {
  tableKey
} from './table'

export function getKeyword(keyword) {
  const project = tableKey.project
  const designer = tableKey.designer
  const example_project = tableKey.example_project
  return new Promise(async (resolve, reject) => {
    const result = {
      project: null,
      designer: null,
      example_project: null,
    }
    try {
      db.collection(project._name)
        .where({
          code: {
            $regex: `.*${keyword}.*`,
            $options: '1'
          }
        })
        .orderBy(project.update_time, 'asc')
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
      db.collection(designer._name)
        .orderBy(designer.update_time, 'asc')
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
      db.collection(example_project._name)
        .orderBy(example_project.update_time, 'asc')
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