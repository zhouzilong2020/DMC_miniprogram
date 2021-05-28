// miniprogram/pages/vote/vote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        label: '全部'
      },
      {
        label: '待完成'
      },
      {
        label: '已完成'
      }
    ],
    tabId: 0,
    allList: [{
      complete: true,
    }, {
      complete: false,
    }, {
      complete: true,
    }],
    todoList: [1, ],
    doneList: [1, 2]
  },

  onTabChange: function (e) {
    const id = Number(e.detail.id)

    this.setData({
      tabId: id
    })
    console.log(this.data)
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