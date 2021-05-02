const marginHori = 74
const marginVerti = 100
const db = wx.cloud.database();
const app = getApp()

import {
  whoAmI,
} from '../../utils/userInfo'

Page({

  data: {
    _id: '',
    animation1: {},
    animation2: {},
    top1: marginVerti,
    left1: marginHori,
    top2: marginVerti,
    left2: marginHori,
    startX: 0,
    startY: 0,

    // 第一张卡片所渲染的数据在data中的位置
    index1: 0,
    // 第二张卡片所渲染的数据在data中的位置
    index2: 1,

    name1: "",
    location1: "",
    imgSrc1: "",
    name2: "",
    location2: "",
    imgSrc2: "",

    windowWidth: 0,
    windowHeight: 0,

    finishCnt: false,
    isFirstInit: true,

    data: [{
      imgSrc: "../../images/index_image/1.jpeg",
      name: "1",
      location: "1",
      id: "1",
    }],

    attitude: [],
    attitudeDirection: {
      'right': true,
      'left': false,
      'up': false,
      'down': true,
    },
    count: 0,
  },

  onLoad: function (options) {
    var that = this
    whoAmI().then(res => {
      // 存储了登录信息, 直接获取
      that.setData({
        _id: res._id,
      })
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })

    that.requestData()
  },

  onReady: function () {},

  onShow: function () {},

  viewTouchInside: function (event) {

    var that = this

    var pointX = event.touches[0].clientX
    var pointY = event.touches[0].clientY

    that.setData({
      startX: pointX,
      startY: pointY
    })

    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
    })
    animation.scale(0.9).step()

    if (that.data.count % 2 == 0) {
      that.setData({
        animation1: animation.export()
      })
    } else {
      that.setData({
        animation2: animation.export()
      })
    }

  },

  viewDidMove: function (event) {

    var that = this

    var pointX = event.touches[0].clientX
    var pointY = event.touches[0].clientY

    var widthCenter = that.data.windowWidth / 2
    var heightCenter = that.data.windowHeight / 2

    var perX = (pointX - that.data.startX) / widthCenter
    var perY = (pointY - that.data.startY) / heightCenter
    var maxPer = (Math.abs(perX) > Math.abs(perY)) ? Math.abs(perX) : Math.abs(perY)

    var animationOpacity = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
    })
    animationOpacity.opacity(maxPer).step()

    var animationRotate = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
    })
    animationRotate.scale(0.9).rotate(perX * 20).step()

    var x = marginHori + pointX - that.data.startX
    var y = marginVerti + pointY - that.data.startY

    if (that.data.count % 2 == 0) {
      that.setData({
        left1: x,
        top1: y
      })
      that.setData({
        animation1: animationRotate.export(),
        animation2: animationOpacity.export()
      })
    } else {
      that.setData({
        left2: x,
        top2: y
      })
      that.setData({
        animation1: animationOpacity.export(),
        animation2: animationRotate.export(),
      })
    }
  },
  viewTouchUpDownInside: function (event) {
    var that = this

    var endX = event.changedTouches[0].clientX
    var endY = event.changedTouches[0].clientY

    var distanceX = endX - that.data.startX
    var distanceY = endY - that.data.startY


    if (distanceX > 93.75) {
      that.removeCard('right')
    } else if (distanceX < -93.75) {
      that.removeCard('left')
    } else if (distanceY < -100) {
      that.removeCard('up')
    } else if (distanceY > 100) {
      that.removeCard('down')
    }

    /* 点按效果 */
    if (distanceX < 93.75 && distanceX > -93.75 && distanceY > -150 && distanceY < 150) {
      if (that.data.that.data.count % 2 == 0) {
        that.setData({
          top1: marginVerti,
          left1: marginHori
        })
      } else {
        that.setData({
          top2: marginVerti,
          left2: marginHori
        })
      }
    }

    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
    })
    animation.scale(1).step()

    if (that.data.count % 2 == 0) {
      that.setData({
        animation1: animation.export()
      })
    } else {
      that.setData({
        animation2: animation.export()
      })
    }

  },

  removeCard: function (direction) {
    var that = this
    var animation = wx.createAnimation({
      duration: 250,
      timingFunction: 'linear',
    })
    this.setData({
      attitude: this.data.attitude.concat(this.data.attitudeDirection[direction])
    })
    if (direction == 'right') {
      animation.translateX(400).rotate(45).opacity(0).step()
      animation.translateX(0).rotate(0).step()
    } else if (direction == 'left') {
      animation.translateX(-400).rotate(-45).opacity(0).step()
      animation.translateX(0).rotate(0).step()
    } else if (direction == 'up') {
      animation.translateY(-400).opacity(0).step()
      animation.translateY(0).step()
    } else if (direction == 'down') {
      animation.translateY(400).opacity(0).step()
      animation.translateY(0).step()
    }

    if (that.data.count % 2 == 0) {
      that.setData({
        animation1: animation.export(),
        // 此时index1应该渲染的是data+2位置处的信息
        index1: that.data.index1 + 2,
        count: that.data.count + 1,
      })
      setTimeout(function () {
        // 如果data中还有数据，则继续渲染，否则结束
        if (that.data.index1 < that.data.data.length) {
          that.setData({
            name1: that.data.data[that.data.index1]["name"],
            imgSrc1: that.data.data[that.data.index1]["imgSrc"],
            location1: that.data.data[that.data.index1]["location"],
            top1: marginVerti,
            left1: marginHori
          })
        } else {
          if (that.data.finishCnt) {
            that.onFinished()
          } else {
            that.setData({
              finishCnt: true
            })
          }
        }
      }.bind(that), 250)
    } else {
      that.setData({
        animation2: animation.export(),
        index2: that.data.index2 + 2,
        count: that.data.count + 1,
      })
      setTimeout(function () {
        if (that.data.index2 < that.data.data.length) {
          console.log(that.data.index2)
          that.setData({
            name2: that.data.data[that.data.index2]["name"],
            location2: that.data.data[that.data.index2]["location"],
            imgSrc2: that.data.data[that.data.index2]["imgSrc"],
            top2: marginVerti,
            left2: marginHori
          })
        } else {
          // 滑动完毕所有照片
          if (that.data.finishCnt) {
            that.onFinished()
          } else {
            that.setData({
              finishCnt: true
            })
          }
        }
      }.bind(that), 100)
    }
  },

  /**
   * 留出调整接口位置
   */
  requestData: function () {
    const that = this
    db.collection('questionnaire').orderBy('timestamp', 'asc').get().then((res) => {
      // 获取照片
      var data = res.data
      var imgSrcs = []
      // 获取所有照片，一次下载
      for (var i = 0, len = data.length; i < len; i++) {
        imgSrcs = imgSrcs.concat(data[i].imgSrc)
      }
      //  将云端文件下载到本地
      wx.cloud.getTempFileURL({
        fileList: imgSrcs, // 文件 ID
        success: res => {
          // 将data数据中的链接替换成本地临时文件
          for (var i = 0, len = data.length; i < len; i++) {
            data[i].imgSrc = res.fileList[i].tempFileURL
          }
          that.setData({
            data: data
          })
          that.pushData()
        },
        fail: res => {
          console.log("fail", res)
        }
      })
    })
  },

  pushData: function () {
    var that = this
    var data = that.data.data
    const index1 = that.data.index1
    const index2 = that.data.index2
    if (that.data.isFirstInit == true) {
      that.setData({
        name1: data[index1]["name"],
        name2: data[index2]["name"],
        location1: data[index1]["location"],
        location2: data[index2]["location"],
        imgSrc1: data[index1]["imgSrc"],
        imgSrc2: data[index2]["imgSrc"],
        isFirstInit: false
      })
    }

  },

  onFinished: function () {
    // TODO 性格分析？
    console.log('finished')
    wx.showToast({
      title: '完成！',
    })
    setTimeout(wx.navigateBack({
      delta: 0,
    }), 1000)

  }
})