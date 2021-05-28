import {
  db,
  _
} from './config'
import {
  whoAmI
} from './userInfo'
const key = "cswx"


async function isScanedBefore(project_id, _openid) {
  const projectIdList = (await (db.collection('user')
    .where({
      _openid
    })
    .field({
      relevant_project_id_list: true
    }).get())).data[0].relevant_project_id_list
  // console.log(projectIdList)
  for (let i = 0, len = projectIdList.length; i < len; i++) {
    if (projectIdList[i] === project_id) {
      return true
    }
  }
  return false

}


export function scanCode() {
  return new Promise((resolve, reject) => {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success: async (res) => {
        const scanResult = JSON.parse(res.result)
        const _id = scanResult._id
        if (scanResult.key === key) {
          try {
            console.log(_id)
            // 判断project中是否有该数据
            await db.collection('project1')
              .doc(_id)
              .field({
                _id: true,
              })
              .get()
            // console.log('has such project')
            // 判断用户是否添加过该项目
            const _openid = wx.getStorageSync('userInfo')._openid
            if (await isScanedBefore(_id, _openid)) {
              reject('have added this project before')
            }
            await db.collection('user')
              .where({
                _openid
              })
              .update({
                data: {
                  relevant_project_id_list: _.push(_id)
                }
              })
            resolve('added successfuly')
          } catch (e) {
            reject(e)
          }
        } else {
          reject('wrong key')
        }
      },
      fail: (res) => {
        reject(res)
      },
    })
  })
}