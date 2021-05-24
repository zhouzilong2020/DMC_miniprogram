import {
  app,
  db
} from "./config.js"

export async function getTempFileURL(fileList) {
  return new Promise((resolve, reject) => {
    wx.cloud.getTempFileURL({
      fileList: fileList,
      success: res => {
        const fileList = res.fileList
        const tempFileURLList = []
        for (let i = 0, len = fileList.length; i < len; i++) {
          tempFileURLList.push(fileList[i].tempFileURL)
        }
        resolve(tempFileURLList)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}