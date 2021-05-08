const db = wx.cloud.database();

import {
  tableKey
} from './table'


export function getIndexCarousel() {
  const carousel = tableKey.carousel
  return new Promise(async (resolve, reject) => {
    try {
      db.collection(carousel._name)
        .orderBy(carousel.update_time, 'asc')
        .get({
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

export function getIndexExampleProject() {
  const example_project = tableKey.example_project
  return new Promise(async (resolve, reject) => {
    try {
      db.collection(example_project._name)
        .orderBy(example_project.update_time, 'asc')
        .get({
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

export function getIndexNews() {
  const news = tableKey.news
  return new Promise(async (resolve, reject) => {
    try {
      db.collection(news._name)
        .orderBy(news.update_time, 'asc')
        .get({
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

export function getIndexDesigner() {
  const designer = tableKey.designer
  return new Promise(async (resolve, reject) => {
    try {
      db.collection(designer._name)
        .orderBy(designer.update_time, 'asc')
        .get({
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