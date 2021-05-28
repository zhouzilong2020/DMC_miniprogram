// components/carousel/carousel.js
import {
  db
} from "../../utils/config"
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    carouselList: [],
    currentIdx: 0
  },
  lifetimes: {
    attached: function () {
      const that = this;
      db.collection('carousel')
        .orderBy('create_time', 'desc')
        .get()
        .then((res) => {
          // console.log(res)
          var result = res.data
          for (let i = 0, len = result.length; i < len; i++) {
            result[i].create_time = new Date(result[i].create_time).Format("yyyy-MM-dd")
          }
          that.setData({
            carouselList: result
          })
        })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change(e) {
      if (this.data.currentIdx >= 0) {
        this.setData({
          currentIdx: -1
        })
      }
    },
    changeFinish(e) {
      this.setData({
        currentIdx: e.detail.current
      })
    },
    onTap(e) {
      console.log(e)
      wx.navigateTo({
        url: `../../pages/news/news?_id=${e.currentTarget.dataset.newsid}`,
        events: {},
        success: res => {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('forwardNews', {
            data: {
              canComment: false,
              news:null,
            }
          })
        }
      })
    }
  }
})