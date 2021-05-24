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
    data: {
      exemplaryProject: [],
      news: [],
      designer: [],
    },
  },

  onLoad: function () {
    const that = this
    that.requestData()
    that.pushData()
  },

  requestData: function () {
    const that = this
    that.data.test.a = [1,1,]
    
    that.setData({
      test:that.data.test
    })
    console

    // let exemplaryProjectResult = []
    // db.collection('news')
    //   .orderBy('create_time', 'desc')
    //   .get()
    //   .then(res => {
    //     const fileList = []
    //     exemplaryProjectResult = res.data
    //     console.log(exemplaryProjectResult)
    //     for (let i = 0, len = exemplaryProjectResult.length; i < len; i++) {
    //       fileList.push(exemplaryProjectResult[i].image_list[0])
    //     }
    //     wx.cloud.getTempFileURL({
    //       fileList: fileList,
    //       success: res => {
    //         const tempFileUrlList = res.fileList
    //         for (let i = 0, len = tempFileUrlList.length; i < len; i++) {
    //           exemplaryProjectResult[i].image = tempFileUrlList[i]
    //         }
    //       }
    //     })
    //   })
  },
  pushData: function () {

  },

  onTabChange: function (e) {
    this.setData({
      curTabIdx: e.detail.id
    })
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  }
})