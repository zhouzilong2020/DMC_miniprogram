// components/project.js
const db = wx.cloud.database();
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
      wx.showModal({
        title: '提示',
        content: '删除后就找不回来了哦!',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            handleClick(e);
          } else if (res.cancel) {
          }
        }
      })
    },

    handleRemove(e) {
      let id = e.target.dataset.id
      // console.log(id)
      // 两个同步的信号量，用于判断整个删除操作是否完成
      let isRemoved = false
      //数据库进行删除记录操作
      db.collection('images').doc(id).remove({
        success: res => {
          console.log('succeed deleting record in db', isRemoved)
          if (!isRemoved) {
            isRemoved = true
          } else {
            this.renewData(id)
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
            this.renewData(id)
          }
        }
      })
    },
    renewData(removeId) {
      let cloneList = [...this.data.imageData]
      console.log('in renew data', cloneList, len(cloneList))

      for (let i = 0, len = len(cloneList); i < len; i++) {
        console.log('in for loop')
        if (cloneList._id == removeId) {
          console.log('in if condition')
          cloneList.splice(i, 1)
          break;
        }
      }
      console.log(cloneList)
      this.setData({
        imageData: cloneList
      })
    },
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