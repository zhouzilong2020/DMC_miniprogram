// components/project-state-panel.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    currentState:{
      type: Number,
      value: 5,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    projectStates:[
      {
        name:'提交',
        icon:'fas fa-check-circle'
      },
      {
        name:'评审',
        icon:'fas fa-users'
      },
      {
        name:'设计',
        icon:'fas fa-pen'
      },
      {
        name:'投票中',
        icon:'fas fa-poll'
      },
      {
        name:'施工中',
        icon:'fas fa-gavel'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
