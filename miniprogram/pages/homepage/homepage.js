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
    userTypeConverter: ['居民', '管理员', '设计师'],
    userPhoto: "/images/user.png",
    nickname: " ",
    logged: true,
    disabled: true,
    userType: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const that = this
    var userInfo
    //先检查是否有登录信息
    try {
      userInfo = await whoAmI()
      // 存储了登录信息, 直接获取
      this.setData({
        avatar: userInfo.avatar,
        nickname: userInfo.nickname,
        logged: true,
        // FIXME 这里需要处理一下
        userType: '居民',
      })
    } catch (e) {
      try {
        // 没有存储登录信息,重新登录
        userInfo = await login() 
        this.setData({
          avatar: userInfo.avatar,
          nickname: userInfo.nickname,
          logged: true,
          // FIXME 这里需要处理一下
          userType: '居民',
        })
      } catch (e) {
        // 可以选择授权登录了
        this.setData({
          disabled: false,
        }) 
        
        // this.getUserProfile()
      }
    }

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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
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
            login().then(res => {
              // console.log(res)
              this.setData({
                userPhoto: res.avatar,
                nickName: res.nickname,
                logged: true,
                userType: res.type,
              })
            })
          })
      }
    })
    // console.log(e);
    let userInfo = e.detail.userInfo;
    if (!this.data.logged && userInfo) { //创建一个用户的表
      db.collection("users").add({
        data: {
          userPhoto: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          signature: " ",
          phoneNumber: ' ',
          wechatNumber: " ",
          address: " ",
          time: new Date()
        }
      }).then((res) => { //
        db.collection('users').doc(res._id).get().then((res) => {
          app.userInfo = Object.assign(app.userInfo, res.data);
          this.setData({
            userPhoto: app.userInfo.userPhoto,
            nickName: app.userInfo.nickName,
            logged: true
          });
        });
        // console.log(res);
      });
    }
    wx.showToast({
      title: '授权成功',
      icon: 'success',
    });
  }
})