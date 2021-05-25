// components/project-state-panel.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    currentState: {
      type: Number,
      value: 3,
    },
    updateTime: {
      type: Date,
      value: "yyyy-MM--dd--hh--ss",
      observer: function (newVal) {
        // your code
        this.setData({
          updateTime: new Date(newVal).Format('yyyy-MM-dd hh:mm:ss')
        })
      }
    },
    title: {
      type: String,
      value: "一个空间的名字",
    },
    spaceType: {
      type: Number,
      value: 1,
    },
    _id: {
      type: String,
      value: "79550af26099d44b15d677b93106c1e6",
    },
  },

  lifetimes: {
  },


  /**
   * 组件的初始数据
   */
  data: {
    
    projectStates: [{
        name: '提交',
        icon: 'fas fa-check-circle'
      },
      {
        name: '评审',
        icon: 'fas fa-users'
      },
      {
        name: '设计',
        icon: 'fas fa-pen'
      },
      {
        name: '投票',
        icon: 'fas fa-poll'
      },
      {
        name: '施工',
        icon: 'fas fa-gavel'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})