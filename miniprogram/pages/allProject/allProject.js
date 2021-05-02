// miniprogram/pages/all/all.js
const app = getApp();
const db = wx.cloud.database();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    db.collection('images').orderBy('timestamp', 'asc').get().then((res) => {
      // 获取照片
      var data = res.data
      if (data.length == 0) {
        wx.showToast({
          title: '暂时还没有数据',
          icon: 'none',
          duration: 150,
          complete: () => {
            setTimeout(() => {
              wx.navigateBack()
            }, 200)
          }
        })
      } else {
        var fileList = []
        for (var i = 0, len = data.length; i < len; i++) {
          fileList.push(data[i].fileID[0])
        }
        // console.log('data', data)
        wx.cloud.getTempFileURL({
          fileList: fileList,
          success: res => {
            var result = []
            var imgSrc = res.fileList
            // console.log('src', imgSrc)
            for (var i = 0, len = data.length; i < len; i++) {
              result.push({
                src: imgSrc[i].tempFileURL,
                _id: data[i]._id,
                formData: data[i].formData,
                date: new Date(data[i].timestamp).toLocaleString().substr(0, 8)
              })
            }
            that.setData({
              imageData: result
            })
            wx.showToast({
              title: '加载成功',
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})