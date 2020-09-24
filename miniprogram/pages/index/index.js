// miniprogram/pages/index/index.js
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideImages: [
      "/images/slide-images/南丹·邻里汇.png",
      "/images/slide-images/四平-同济新村院落空间.png",
      "/images/slide-images/徐汇-衡复微空间.png"
    ],
    imageData: [{
      src: "../../images/slide-images/南丹·邻里汇.png",
      title: "南丹·邻里汇",
      _id:'1'
    }, {
      src: "../../images/slide-images/四平-同济新村院落空间.png",
      title: "四平-同济新村院落",
      _id:'2'
    }, {
      src: "../../images/slide-images/徐汇-衡复微空间.png",
      title: "徐汇-衡复微空间",
      _id:'3'
    }],

    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.detail.markerId)
  },
  controltap(e) {
    console.log(e.detail.controlId)
  },
  click: function(e){
    console.log('e')
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