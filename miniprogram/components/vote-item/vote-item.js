// components/vote-item/vote-item.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isFinished: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: "上海市延吉街道改造成果\n民众满意程度调查",
    },
    viewCnt: {
      type: Number,
      value: "12341"
    },
    createTime: {
      type: Date,
      value: 'yyyy-MM-dd hh:mm:ss',
      observer: function (evl) {
        this.setData({
          createTime: (new Date(evl)).Format('yyyy-MM-dd hh:mm:ss')
        })
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})