// components/my-project.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    status: {
      type: Number,
      value: 1,
    },
    title: {
      type: String,
      value: '上海市延吉路社区什么时候改造呢上海市延吉路社区什么时候改造呢'
    },
    image: {
      type: String,
      value: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3026939796,485761977&fm=26&gp=0.jpg'
    },
    spaceType: {
      type: Number,
      value: 0
    },
    update_time: {
      type: String,
      value: '2020-05-21',
      observer: function (evl) {
        this.setData({
          update_time: new Date(evl).Format('yyyy-MM-dd')
        })
      }
    },
    create_time: {
      type: String,
      value: '2020-05-21',
      observer: function (evl) {
        this.setData({
          create_time: new Date(evl).Format('yyyy-MM-dd')
        })
      }
    },
    _id: String
  },


  /**
   * 组件的初始数据
   */
  data: {
    statuses: ['提交', '评审', '设计', '投票', '施工',],
    spaceTypes: ['商业类畸形空间', '休闲型畸形空间', '文化型畸形空间', '社交性畸形空间', '废弃型畸形空间'],
    left: 0,
    startClientX: 0,
    direction: 0,
    maxClientX: 138 / 750 * wx.getSystemInfoSync().windowWidth,
    autoMoving: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    projecTouchStart(e) {
      this.setData({
        startClientX: e.changedTouches[0].clientX - this.data.left,
        direction: 0
      })
    },
    projectTouchMove(e) {
      const { left, startClientX, maxClientX } = this.data;
      const curClientX = e.changedTouches[0].clientX;
      let newLeft = curClientX - startClientX;
      if (newLeft < -maxClientX || newLeft > 0) {
        return;
      }
      this.setData({
        direction: newLeft - left,
        left: newLeft,
        autoMoving: false
      })
    },
    projecTouchEnd(e) {
      let newLeft = 0;
      const { left, maxClientX, direction, _id } = this.data;
      if (direction == 0 && left == 0) {
        wx.navigateTo({
          url: '../../pages/project/project?_id=' + _id
        })
      }
      else if (direction < 0 && left < -maxClientX / 3) {
        newLeft = -maxClientX;
      }
      this.setData({
        autoMoving: true,
        left: newLeft
      })
      setTimeout(() => {
        this.setData({
          autoMoving: false
        })
      }, 3000)
    }
  }
})