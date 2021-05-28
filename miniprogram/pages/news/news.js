// miniprogram/pages/news/news.js
import {
  db,
  _
} from "../../utils/config"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canComment: false,
    news: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const _id = options._id
    const that = this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('forwardNews', async (res) => {
      // console.log(res.data)
      // 上一个页面传进来了news
      if (res.data.news) {
        // console.log("have news inside")
        that.setData({
          news: res.data.news,
          canComment: res.data.canComment
        })
      } else { // 没有的话需要自己获取
        // console.log("do not have news inside", _id)
        const newsRes = (await db.collection('news').doc(_id).get()).data
        // console.log(newsRes)
        that.setData({
          news: newsRes,
          canComment: res.data.canComment
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