// miniprogram/pages/index/index.js
const db = wx.cloud.database();
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      label: '示范项目',
      icon: 'fas fa-info'
    }, {
      label: '近期动态',
      icon: 'fas fa-building'
    }, {
      label: '设计师',
      icon: 'fas fa-pen'
    }],
    curTabIdx: 0,
    referenceImageData: [],
    imageData: null,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },

  onLoad: function () {
    const that = this
    that.requestData()
    that.pushData()
  },
  requestData: function () {
    const that = this
    db.collection('cases').orderBy('_createTime', 'asc').get().then((res) => {
      var fileList = []
      var data = res.data
      for (var i = 0, len = data.length; i < len; i++) {
        if (data[i].img_src.length) {
          fileList.push(data[i].img_src[0])
        } else {
          fileList.push(data[i].img_src)
        }
      }
      wx.cloud.getTempFileURL({
        fileList: fileList,
        success: res => {
          var pathData = res.fileList
          var result = []
          for (var i = 0, len = pathData.length; i < len; i++) {
            result.push({
              src: pathData[i].tempFileURL,
              title: data[i].title,
              _id: data[i]._id
            })
          }
          that.setData({
            referenceImageData: result
          })
        }
      })
    })
  },
  pushData: function () {

  },

  onTabChange: function (e) {
    this.setData({
      curTabIdx: e.detail.id
    })
  },
})