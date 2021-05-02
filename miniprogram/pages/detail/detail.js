// miniprogram/pages/detail/detail.js
const app = getApp()
const db = wx.cloud.database()
import {
  cases
} from "../../documents/cases"
Page({

  properties: {
    imageSrc: {
      type: String,
      value: null
    },
    date: {
      type: String,
      value: null
    },
    type: {
      type: String,
      value: null
    },
    description: {
      type: String,
      value: null
    },
    step: {
      type: Number,
      value: null
    },
  },


  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    imageSrc: null,
    date: null,
    type: null,
    description: null,
    step: 0,
    showTel: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    console.log(options)
    wx.showLoading({
      title: '加载中',
    })
    // 拿到URL中的参数
    var _id = options._id
    var showTel = options.showTel
    var isCase = options.isCase
    if (isCase == 'true') {
      isCase = true
    } else {
      isCase = false
    }
    var collection_name = isCase ? 'cases' : 'images'
    console.log(collection_name, _id)

    db.collection(`${collection_name}`).where({
      _id: _id
    }).get().then(res => {
      var data = res.data[0]
      wx.cloud.getTempFileURL({
        fileList: isCase ? data.img_src : data.fileID,
        success: res => {
          var src = res.fileList[0].tempFileURL
          that.setData({
            title: isCase ? data.title : '',
            imageSrc: src,
            date: new Date(isCase ? data.complete_time : data.timestamp).toLocaleString().substr(0, 8),
            type: that.getType(isCase ? data.type : Number(data.formData.type)),
            description: isCase ? data.info : data.formData.extraInfo,
            step: isCase ? data.step : data.formData.step,
            showTel: showTel
          })
          wx.showToast({
            title: '加载完成',
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