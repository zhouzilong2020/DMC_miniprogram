/**
 * 上传成功案例库
 * @param {*} len 照片长度
 * @param {*} tempFilePath 临时文件file
 * @param {*} info 相关文字资料
 */
function uploadImage(len, tempFilePath, info) {
  wx.showLoading({
    title: '正在提交',
  })
  var timestamp = Date.parse(new Date());
  var fileIds = []
  for (let i = 0; i < len; i++) {
    var filePath = tempFilePaths[i];
    var cloudPath = './' + 'cases' + '/' + timestamp + '_' + i + filePath.match(/\.[^.]+?$/)[0];
    wx.cloud.uploadFile({
      cloudPath: cloudPath, //云
      filePath: filePath, //本地
      success: (res) => {
        fileIds.concat(res.fileID);
        if (i == len - 1) { // 照片全部提交成功 
          db.collection('cases').add({
            data: {
              info: info,
              fileId: fileIds,
              timestamp: timestamp
            }
          }).then((res) => {
            wx.showToast({
              title: "提交成功！"
            });
          })
        }
      }
    })
  }
}

function selectImage() {
  wx.chooseImage({
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      return res
    }
  })
}