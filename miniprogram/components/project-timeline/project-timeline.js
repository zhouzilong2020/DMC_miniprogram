// components/project-timeline.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    step: {
      type: Number,
      value: 1
    },
    timeStamp: {
      type: Date,
      observer: function (newEvl) {
        this.setData({
          timeStamp: new Date(newEvl).Format('yyyy-MM-dd')
        })
      
      }
    }


  },

  /**
   * 组件的初始数据
   */
  data: {
    content: [
      '项目提交成功啦！',
      '项目通过评审啦！',
      '项目设计方案成功提交啦！',
      '项目投票结束啦！',
      '项目施工完毕啦！',
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})