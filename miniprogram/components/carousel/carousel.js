// components/carousel/carousel.js
Component({
  options:{
    addGlobalClass:true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    slideImages: [],
    currentIdx: 0
  },
  lifetimes: {
    attached: function () {
      const _this = this;
      const db = wx.cloud.database();
      db.collection('index_image').orderBy('_createTime', 'asc').get().then((res) => {
        var fileList = []
        var data = res.data
        for (var i = 0, len = data.length; i < len; i++) {
          fileList.push(data[i].src)
        }
        wx.cloud.getTempFileURL({
          fileList: fileList,
          success: res => {
            var data = res.fileList
            var result = []
            for (var i = 0, len = data.length; i < len; i++) {
              result.push(data[i].tempFileURL)
            }
            _this.setData({
              slideImages: result
            })
          }
        })
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change(e) {
      if (this.data.currentIdx >=0) {
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
    test(e) {
      console.log(e);
    }
  }
})
