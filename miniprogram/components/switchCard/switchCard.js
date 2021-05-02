// components/switchCard/switchCard.js
const marginHori = 74
const marginVerti = 100

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgSrc: {
      type: String,
      value: "../../images/index_image/1.jpeg"
    },
    name: {
      type: String,
      value: "name"
    },
    location: {
      type: String,
      value: "location"
    },
    isFirstCard: {
      type: Boolean,
      value: true
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    animation: {},
    top: marginVerti,
    left: marginHori,
    startX: 0,
    startY: 0,

    windowWidth: 0,
    windowHeight: 0,

    attitude: [],
    attitudeDirection: {
      'right': true,
      'left': false,
      'up': false,
      'down': true,
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      var that = this
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            windowWidth: res.windowWidth,
            windowHeight: res.windowHeight
          })
        }
      })
    },
    getAttitude: function (direction) {
      const attitudeDirection = {
        'right': true,
        'left': false,
        'up': false,
        'down': true,
      }
      return attitudeDirection[direction]
    },
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

      if (that.data.isFirstCard == true) {
        that.setData({
          animation: animation.export()
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

      if (that.data.isFirstCard == true) {
        that.setData({
          left: x,
          top: y
        })
        that.setData({
          animation: animationRotate.export(),
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
        if (that.data.isFirstCard == true) {
          that.setData({
            top: marginVerti,
            left: marginHori
          })
        }
      }
      var animation = wx.createAnimation({
        duration: 100,
        timingFunction: 'ease-out',
      })
      animation.scale(1).step()
      if (that.data.isFirstCard == true) {
        that.setData({
          animation: animation.export()
        })
      }
    },
    removeCard: function (direction) {
      var that = this

      var animation = wx.createAnimation({
        duration: 250,
        timingFunction: 'linear',
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
      if (that.data.isFirstCard == true) {
        that.setData({
          animation: animation.export(),
          isFirstCard: false
        })
        var attitude = that.getAttitude(direction)
        setTimeout(function () {
          if (attitude) {
            that._like()
          } else {
            that._dislike()
          }
        }.bind(that), 250)
      }
    },


    /**
     * 回调函数
     */
    _like: function () {
      this.triggerEvent("like")
    },
    _dislike: function () {
      this.triggerEvent("dislike")
    }
  }
})