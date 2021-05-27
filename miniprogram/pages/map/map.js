// miniprogram/pages/map/map.js
const db = wx.cloud.database();
const app = getApp();


Page({
  /**
   * 页面的初始数据
   */
  data: {
    longitude: 121.501837,
    latitude: 31.282640,
    path: "/images/company.png",
    accuracy: 10,
    markerList: [{
      id: 0,
      width: 30,
      latitude: 31.282640,
      longitude: 121.501837,
    }],
    markerIdList: [0, ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onReady: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: async function () {
    const that = this
    // TODO 调整数据库
    const markerResult = (await db.collection('images')
    .orderBy('timestamp', 'asc')
      .field({
        formData: true,
        fileID: true,
        _id: true
      }).get()).data
    const markerList = []
    const markerIdList = []
    for (let i = 0, len = markerResult.length; i < len; i++) {
      const marker = markerResult[i]
      markerIdList.push(marker._id)
      markerList.push({
        latitude: marker.formData.latitude,
        longitude: marker.formData.longitude,
        iconPath: marker.fileID[0],
        width: 40,
        height: 40,
        id: i + 1,
        alpha: 0.8
      })
    }
    this.setData({
      markerList: that.data.markerList.concat(markerList),
      markerIdList: that.data.markerIdList.concat(markerIdList)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
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



  onMarkertap(e) {
    const _id = this.data.markerIdList[e.detail.markerId]
    console.log(_id)
    // TODO 调整数据库
    // wx.redirectTo({
    // url: '../project/project?_id='+_id,
    // })
  }
})