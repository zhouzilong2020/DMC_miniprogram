import {
  db
} from "../../utils/config"

// miniprogram/pages/project/project.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project: {},
    statusTimeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _id = options._id
    db.collection('project1')
      .doc(_id)
      .get()
      .then(res => {
        console.log(res)
        this.setData({
          project: res.data,
          // 注意这里的time list 是从早到晚，分别对应了5个阶段        
          statusTimeList: res.data.status_time_list
        })
        // console.log(this.data.project)
        // console.log(this.data.statusTimeList)
      })
      .catch(err => {
        console.log(err)
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