// miniprogram/pages/homepage/homepage.js
const app = getApp();//拿到app对象，得到全剧对象
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto:"/images/user.png",
    nickname:" ",
    logged: false,
    disabled : true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.cloud.callFunction({
      name : 'login',
      data : {}
    }).then((res) =>{
      // console.log(res);
      db.collection('users').where({
        _openid : res.result.openid
      }).get().then((res) =>{
        if( res.data.length ){
          app.userInfo = Object.assign( app.userInfo, res.data[0]);
          console.log(res)
          this.setData({
            userPhoto : app.userInfo.userPhoto,
            nickName : app.userInfo.nickName,
            logged : true
          });
        }
        else{
          this.setData({
            disabled : false,
          });
        }
        
      });
    });
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

  bindGetUserInfo(e){
    wx.showLoading({
      title: '正在授权',
    })
    console.log(e);
    let userInfo = e.detail.userInfo;
    if(!this.data.logged && userInfo){//创建一个用户的表
      db.collection("users").add({
        data:{
          userPhoto : userInfo.avatarUrl,
          nickName : userInfo.nickName,
          signature : " ",
          phoneNumber : ' ',
          wechatNumber : " ",
          address : " ",
          time : new Date()
        }
      }).then((res) => {  //
        db.collection('users').doc(res._id).get().then((res) =>{
          app.userInfo = Object.assign( app.userInfo, res.data);
          this.setData({
            userPhoto : app.userInfo.userPhoto,
            nickName : app.userInfo.nickName,
            logged : true
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