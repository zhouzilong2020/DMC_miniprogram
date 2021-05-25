// components/news.js
import {
  filterRichtext
} from "../../utils/text"
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    news: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: "“活力四射”-发起睦邻活动啊啊啊啊",
    content: "2020年，城市微新团队进行了一个改造。城市微新团队进行了一个改造。城市微新团队进行了一个改造。2020年，城市微新团队进行了一个改造。城市微新团队进行了一个改造。城市微新团队进行了一个改造",
    create_time: "2020-03-08",
    image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3026939796,485761977&fm=26&gp=0.jpg",
    publishData: ''
  },
  lifetimes: {
    ready: function () {
      console.log(this.data)
      const that = this
      this.setData({
        publishData: new Date(that.data.news.create_time).Format("yyyy-MM-dd"),
        title: that.data.news.title,
        content: filterRichtext(that.data.news.content),
        image: that.data.news.image,
      })
      // console.log(this.data)
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (e) {
      const that = this
      wx.navigateTo({
        url: `../../pages/news/news?_id=${that.data.news._id}`,
        events: {},
        success: res => {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('forwardNews', {
            data: {
              news: that.data.news
            }
          })
        }
      })
    },
  }
})