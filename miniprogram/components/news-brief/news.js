// components/news.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "“活力四射”-发起睦邻活动啊啊啊啊",
    },
    content: {
      type: String,
      value: "2020年，城市微新团队进行了一个改造。城市微新团队进行了一个改造。城市微新团队进行了一个改造。2020年，城市微新团队进行了一个改造。城市微新团队进行了一个改造。城市微新团队进行了一个改造。",
    },
    publishDate: {
      type: Date,
      value: "2020-03-08",
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    ready: function () {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (e) {
      console.log("navigate to detail page")
    },
  }
})