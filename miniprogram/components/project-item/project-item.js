// components/project-item.js
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
    project: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    ready: function () {
      // console.log(this.data)
      const that = this
      const project = that.data.project
      this.setData({
        publishData: new Date(project.create_time).Format("yyyy-MM-dd"),
        title: project.title,
        content: filterRichtext(project.content),
        image: project.image,
        viewCnt: project.view_cnt,
        location: project.location,
        spaceType: project.spaceType,
      })
      // console.log(this.data)
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function () {
      const that = this
      wx.navigateTo({
        url: `../../pages/news/news?_id=${that.data.project._id}`,
        events: {},
        success: res => {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('forwardNews', {
            data: {
              news: that.data.project,
              canComment: false
            }
          })
        }
      })
    }
  }
})