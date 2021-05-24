// custom-tab-bar/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    list: [{
      iconClass: "fas fa-home",
      text: "首页",
      pagePath: "/pages/index/index",
    }, {
      iconClass: "fas fa-location-arrow",
      text: "地图",
      pagePath: "/pages/map/map"
    },
    {
      iconClass: "fas fa-bars",
      text: "项目",
      pagePath: "/pages/my-project/my-project"
    },
    {
      iconClass: "fas fa-user",
      text: "个人",
      pagePath: "/pages/homepage/homepage"
    }
    ]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})
