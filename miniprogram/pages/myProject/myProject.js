// miniprogram/pages/myProject/myProject.js
const app = getApp();
const db = wx.cloud.database();
import {
  getUserInfo
} from '../../utils/userInfo'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
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
    getUserInfo().then(res => {
      db.collection('images').where({
        _openid: res._openid,
      }).orderBy('timestamp', 'asc').get().then((res) => {
        // 获取照片
        var images = res.data
        console.log('in db retrieve data', images)
        if (images.length == 0) {
          wx.showToast({
            title: '你还没有发表过哦！',
            icon: 'none',
            duration: 1500,
            complete: () => {
              setTimeout(() => {
                wx.navigateBack()
              }, 1000)
            }
          })

        } else {
          var cnt = 0;
          var imageData = [];
          for (var i = 0, len = images.length; i < len; i++) {
            console.log('in for loop')
            let image = images[i];
            //  将云端文件下载到本地
            wx.cloud.downloadFile({
              fileID: image.fileID[0], // 文件 ID
              success: res => {
                // console.log('in downloading file', res)
                imageData = imageData.concat({
                  src: res.tempFilePath,
                  _id: image._id,
                  formData: image.formData,
                  date:  new Date(image.timestamp).toLocaleString().substr(0, 8)
                });
                // console.log(" ", imageData)
                if (++cnt == len) {
                  imageData.sort((a, b) => {
                    return a.timestamp - b.timestamp
                  })
                  // console.log(" ", imageData)
                  that.setData({
                    imageData: that.data.imageData.concat(imageData)
                  })
                  wx.showToast({
                    title: '加载成功',
                  })
                  console.log(this.data)
                }
              },
              fail: console.log('error')
            })
          }
        }
      })
    }).catch(e => {
      console.log('fail to login user', e)
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