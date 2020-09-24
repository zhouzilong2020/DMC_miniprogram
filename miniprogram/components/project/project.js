// components/project.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageData: {
      type: Array,
      value: [{
        src: "../../images/slide-images/南丹·邻里汇.png",
        title: "南丹·邻里汇",
        _id: '123'
      }],
    }
  },
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: function () {
    return {

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e) {
      let id = e.currentTarget.dataset.id
      console.log(e.currentTarget.dataset.id)
      wx.cloud.callFunction({
        name: 'update',
        data: {
          collection: 'users',
          doc: id,
          data:{
            // 需要更新的数据
            a:'a'
          }
        }
      }).then((res) =>{
        console.log(res)
      })

    }
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log("component created", this.data)
      this.setData({
        imageData: this.data.imageData
      })
    },
  }
})