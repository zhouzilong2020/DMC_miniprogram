import {
  db
} from './config'
/**
 * 上传成功案例库
 * @param {*} len 照片长度
 * @param {*} tempFilePath 临时文件file
 * @param {*} info 相关文字资料
 */
export function uploadImage(tempFilePaths) {
  return new Promise((resolve, reject) => {
    var timestamp = new Date()
    const fileIdList = []
    for (let i = 0, len = tempFilePaths.length; i < len; i++) {
      const tempFilePath = tempFilePaths[i]
      const cloudPath = `./cases/${timestamp.Format('yyyy')}/${timestamp.Format('MM-dd')}/${timestamp.Format('hh-mm-ss')}_${i}.png`
      wx.cloud.uploadFile({
        cloudPath: cloudPath, //云
        filePath: tempFilePath, //本地
      }).then(res => {
        fileIdList.push(res.fileID)
        if (fileIdList.length === tempFilePaths.length) {
          resolve(fileIdList)
        }
      }).catch(err => {
        // 只要有一个失败，返回当前所有成功上传的image，删掉
        reject({
          mes: err,
          fileIdList
        })
      })
    }
  })
}
export function deleteImage(fileIdList) {
  return new Promise((resolve, reject) => {
    wx.cloud.deleteFile({
      fileList: fileIdList,
      success: res => {
        // handle success
        resolve(res.fileList)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}