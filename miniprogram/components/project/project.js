// components/project.js
const db = wx.cloud.database();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isCase: {
      type: Boolean,
      value: false
    },
    showTel: {
      type: Boolean,
      value: false,
    },
    canDelete: {
      type: Boolean,
      value: true,
    },
    imageData: {
      type: Array,
      value: [{
        src: "../../images/slide-images/南丹·邻里汇.png",
        title: "南丹·邻里汇",
        _id: '123',
        date: '',
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
      dialog: {
        hidden: true,
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleLongPress(e) {
      console.log('you r in long press')
    },

    handleClick(e) {
      var that = this
      wx.showModal({
        title: '提示',
        content: '删除后就找不回来了哦!',
        success(res) {
          if (res.confirm) {
            that.handleRemove(e);
          } else if (res.cancel) {}
        }
      })
    },
    toDetail(e) {
      const that = this
      let url = `../detail/detail?_id=${e.currentTarget.dataset.id}&showTel=${that.data.showTel}&isCase=${that.data.isCase}`
      console.log(url)
      wx.navigateTo({
        url: url,
      })
    },

    handleRemove(e) {
      var that = this
      let id = e.target.dataset.id
      console.log(id)
      // 两个同步的信号量，用于判断整个删除操作是否完成
      let isRemoved = false
      //数据库进行删除记录操作
      db.collection('images').doc(id).remove({
        success: res => {
          console.log('succeed deleting record in db', isRemoved)
          if (!isRemoved) {
            isRemoved = true
          } else {
            console.log("renew data1")
            that.renewData(id)
          }
        }
      })
      // 删除相应的图片
      wx.cloud.deleteFile({
        fileList: [id],
        success: res => {
          console.log('succeed deleting image file', isRemoved)
          if (!isRemoved) {
            isRemoved = true
          } else {
            console.log("renew data2", id)
            that.renewData(id)
          }
        }
      })
    },

    renewData(removeId) {
      console.log("in renewData", this.data.imageData)
      let imageData = this.data.imageData
      console.log('in renew data', imageData)

      for (let i = 0, len = imageData.length; i < len; i++) {
        console.log('in for loop')
        if (imageData[i]._id == removeId) {
          console.log('in if condition')
          imageData.splice(i, 1)
          break;
        }
      }
      this.setData({
        imageData: imageData
      })
    },
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        imageData: this.data.imageData,
        canDelete: this.data.canDelete,
        isLocal: this.data.isLocal,
        showTel: this.data.showTel,
        isCase: this.data.isCase
      })
    },
  }
})