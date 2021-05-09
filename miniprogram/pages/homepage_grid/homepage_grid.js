// miniprogram/pages/homepage/homepage.js
const app = getApp(); //拿到app对象，得到全剧对象
const db = wx.cloud.database()
import {
  login,
  whoAmI,
} from '../../utils/userInfo'

import {
  addUser
} from '../../database/userInfo';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto: "/images/user.png",
    nickname: " ",
    logged: false,
    disabled: true,
    userType: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先检查是否有登录信息
    whoAmI().then(res => {
      // 存储了登录信息, 直接获取
      this.setData({
        userPhoto: res.userPhoto,
        nickName: res.nickName,
        logged: true,
        userType: res.userType,
      })
    }).catch(e => {
      // 没有存储登录信息,重新登录
      login().then(res => {
        console.log(res)
        this.setData({
          userPhoto: res.userPhoto,
          nickName: res.nickName,
          logged: true,
          userType: res.userType,
        })
      }).catch(err => {
        this.setData({
          disabled: false,
        })
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

  },

  getUserProfile: function (e) {
    wx.getUserProfile({
      desc: 'desc',
      success: res => {
        const userInfo = res.userInfo
        addUser(null, userInfo)
          .then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
      }
    })
  },
})