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
    statuses: ['提交', '评审', '设计', '投票', '施工', ],
    spaceTypes: ['商业类畸形空间', '休闲型畸形空间', '文化型畸形空间', '社交性畸形空间', '废弃型畸形空间'],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})