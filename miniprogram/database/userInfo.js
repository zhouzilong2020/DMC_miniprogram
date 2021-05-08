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