// miniprogram/pages/map/map.js
const db = wx.cloud.database();
const app = getApp();


Page({
  /**
   * 页面的初始数据
   */
  data: {
    longitude: 121.501837,
    latitude: 31.282640,
    path: "/images/company.png",
    accuracy: 10,
    markers: [{
      id: 0,
      latitude: 31.282640,
      longitude: 121.501837,
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var cnt = 0;
    db.collection('images').orderBy('timestamp', 'asc').field({
      formData: true,
      fileID: true,
    }).get().then((res) => {
      for (var i = 0, len = res.data.length; i < len; i++) {
        // 异步函数,注意同步
        wx.cloud.downloadFile({
          fileID: res.data[i].fileID[0], // 文件 ID
          success: imagePath => {
            // console.log('in downloading file', res)
            this.setData({
              markers: this.data.markers.concat({
                latitude: res.data[cnt].formData.latitude,
                longitude: res.data[cnt].formData.longitude,
                iconPath: imagePath.tempFilePath,
                width: 40,
                height: 40,
                id: res.data[cnt]._id
              })
            })
            cnt += 1
            // console.log('2')
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },

  uploadPhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {

        wx.showLoading({
          title: '正在上传',
        })
        const filePath = res.tempFilePaths[0];
        const cloudPath = '' + filePath.match(/\.[^.]+?$/)[0];
        //上传图片
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: filePath,
          success: (res) => {
            console.log(res);
          },
          // 上传完成
          complete: () => {
            wx.hideLoading()
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000,
            })

          }
        });

      }
    });
  },
  markertap(e) {
    console.log(e.markerId);
    wx.navigateTo({
      url: "../detail/detail?_id=" + e.markerId
    })
  }
})