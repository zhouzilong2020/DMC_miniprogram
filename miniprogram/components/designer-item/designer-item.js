// components/designer-item/designer-item.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    designer: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    name: "林滏",
    style: "我爱工作"
  },
  lifetimes: {
    ready: function () {
      console.log(this.data)
      const that = this
      this.setData({
        name: that.data.designer.name,
        style: that.data.designer.style,
      })
      console.log(this.data)
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (e) {
      const that = this
      wx.navigateTo({
        url: `../../pages/designer/designer?_id=${that.data.designer._id}`,
        events: {},
        success: res => {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('forwardDesigner', {
            data: {
              designer: that.data.designer
            }
          })
        }
      })
    }
  }
})