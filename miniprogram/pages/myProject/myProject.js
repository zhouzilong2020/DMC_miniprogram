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
    const that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    getUserInfo().then(res => {
      db.collection('images').where({
        _openid: res._openid,
      }).orderBy('timestamp', 'asc').get().then((res) => {
        // 获取照片
        var data = res.data
        var fileList = []
        if (data.length == 0) {
          wx.showToast({
            title: '你还没有发表过哦！',
            icon: 'none',
            duration: 150,
            complete: () => {
              setTimeout(() => {
                wx.navigateBack()
              }, 200)
            }
          })

        } else {
          // 一次下载操作
          for (var i = 0, len = data.length; i < len; i++) {
            fileList.push(data[i].fileID[0])
          }
          wx.cloud.getTempFileURL({
            fileList: fileList,
            success: res => {
              var result = []
              for (var i = 0, len = data.length; i < len; i++) {
                result.push({
                  _id: data[i]._id,
                  src: res.fileList[i].tempFileURL,
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