// components/process/process.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    _id: {
      type: String,
      value: '12314124'
    },
    step: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    icon: {
      complete: '../../images/complete-1.png',
      incomplete: '../../images/complete-0.png'
    },
    processData: [{
        name: '已提交',
        start: '#fff',
        end: '#EFF3F6',
        step: 0
      },
      {
        name: '设计中',
        start: '#EFF3F6',
        end: '#EFF3F6',
        step: 1
      },
      {
        name: '投票中',
        start: '#EFF3F6',
        end: '#EFF3F6',
        step: 2
      },
      {
        name: '施工中',
        start: '#EFF3F6',
        start: '#EFF3F6',
        step: 3
      }, {
        name: '已完成',
        start: '#EFF3F6',
        end: '#fff',
        step: 4
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})