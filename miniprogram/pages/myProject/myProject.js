// miniprogram/pages/myProject/myProject.js
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
    db.collection('images').where({
      _openid: app.userInfo._openid,
    }).orderBy('timestamp', 'asc').get().then((res)=>{
      // 获取照片
      var images = res.data
      console.log(" ", images)
      var cnt = 0;
      var imageData = [];
      for(var i = 0, len = images.length; i < len; i++){
        let image = images[i];
        wx.cloud.downloadFile({
          fileID: image.fileID[0], // 文件 ID
          success: res => {
            // console.log(res.tempFilePath)
            imageData = imageData.concat({src : res.tempFilePath, title : "哈哈", timestamp : image.timestamp});
            // console.log(" ", imageData)
            if(++cnt == len){
              imageData.sort((a, b) =>{
                return a.timestamp - b.timestamp
              })
              // console.log(" ", imageData)
              that.setData({
                imageData: that.data.imageData.concat(imageData)
              })
              wx.showToast({
                title: '加载成功',
              })
            }
          },
          fail: console.error
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