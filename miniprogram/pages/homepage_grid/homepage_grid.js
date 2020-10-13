// miniprogram/pages/homepage/homepage.js
const app = getApp(); //拿到app对象，得到全剧对象
const db = wx.cloud.database();
import {
  login,

  whoAmI,
} from '../../utils/userInfo'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto: "/images/user.png",
    nickname: " ",
    logged: false,
    disabled: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先检查是否有登录信息
    whoAmI().then(res => {
      console.log(res)
      // 存储了登录信息, 直接获取
      this.setData({
        userPhoto: res.userPhoto,
        nickName: res.nickName,
        logged: true,
      })
    }).catch(e => {
      console.log('get userInfo fail', e)
      // 没有存储登录信息,重新登录
      login().then(res => {
        console.log(res)
        this.setData({
          userPhoto: res.userPhoto,
          nickName: res.nickName,
          logged: true,
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

  bindGetUserInfo(e) {
    wx.showLoading({
      title: '正在授权',
    })
    console.log(e);
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
        console.log(res);
      });
    }
    wx.showToast({
      title: '授权成功',
      icon: 'success',
    });
  }

})