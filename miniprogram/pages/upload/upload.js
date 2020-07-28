const app = getApp()
wx.cloud.init({
  env:'test-0xsoi',
})
Page({
  data: {
      files: [],
      urls: [],
  },
  onLoad() {
      this.setData({
          selectFile: this.selectFile.bind(this),
          uplaodFile: this.uplaodFile.bind(this)
      })
  },
  previewImage: function(e){
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.files // 需要预览的图片http链接列表
      })
  },
  selectFile(files) {
    console.log('files', files)
    var that = this;
    that.setData({
      files: that.data.files.concat(files.tempFilePaths),
      urls: that.data.files.concat(files.tempFilePaths),
    })
      // 返回false可以阻止某次文件上传
  },

  uplaodFile(files) {
      var that = this;
      console.log('upload files', files)
      // 文件上传的函数，返回一个promise
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('some error')
        }, 10000)
        var tempFilePaths = files.tempFilePaths;
        for (let i = 0; i < tempFilePaths.length; i++){
          var filePath = tempFilePaths[i];
          var cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0];
          wx.cloud.uploadFile({
            cloudPath: cloudPath, //云
            filePath: filePath,   //本地
            success: (res) =>{
              console.log("upload Success", res);
              that.setData({
                'files[i].loading' :false,
                urls: that.data.urls.concat([res.fileID]),
              });
            }
          })
        }
        resolve({urls: that.data.urls})
      })
  },

  uploadError(e) {
      console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
      console.log('upload success', e.detail)
  }
});