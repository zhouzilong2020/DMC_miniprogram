// miniprogram/pages/detail/detail.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: null,
    date: null,
    type: null,
    description: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    // 拿到URL中的参数
    let _id = options._id

    let data = db.collection('images').where({
      _id: _id
    }).get().then((res) => {
      var data = res.data[0]
      wx.cloud.downloadFile({
        fileID: data.fileID[0], // 文件 ID
        success: res => {
          this.setData({
            imageSrc: res.tempFilePath,
            date: new Date(data.timestamp).toLocaleString(),
            type: this.getType(data.formData.type),
            description: data.formData.extraInfo,
          })
          console.log(this.data, )
          wx.hideLoading({
            success: (res) => {
              wx.showToast({
                title: '加载成功',
              })
            },
          })
        }
      })
    })
  },

  getType(type) {
    var types = [
      "商业型畸零空间",
      "休闲型畸零空间",
      "文化型畸零空间",
      "社交型畸零空间",
      "废弃型畸零空间"
    ]
    return types[type];
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