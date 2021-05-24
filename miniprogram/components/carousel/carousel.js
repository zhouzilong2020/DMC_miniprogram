// components/carousel/carousel.js
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
    carouselList:[],
    currentIdx: 0
  },
  lifetimes: {
    attached: function () {
      const that = this;
      const db = wx.cloud.database();
      db.collection('carousel')
        .orderBy('create_time', 'desc')
        .get()
        .then((res) => {
          const fileList = []
          const data = res.data
          var result = data
          for (let i = 0, len = data.length; i < len; i++) {
            fileList.push(data[i].image)
          }
          wx.cloud.getTempFileURL({
            fileList: fileList,
            success: res => {
              const data = res.fileList
              for (var i = 0, len = data.length; i < len; i++) {
                result[i].image=data[i].tempFileURL
              }
              // handle timestamp
              for (let i = 0, len = result.length; i <  len; i++){
                result[i].create_time = new Date(result[i].create_time).Format("yyyy-MM-dd")         
              }
              that.setData({
                carouselList: result
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
    test(e) {
      console.log(e);
    }
  }
})