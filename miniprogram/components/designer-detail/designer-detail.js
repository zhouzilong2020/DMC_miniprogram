// components/designer-detail/designer-detail.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    designer: Object,
  },
  data: {
    labelList: [],
    style: '',
    experienceHtml: '',
    name: '',
    avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3026939796,485761977&fm=26&gp=0.jpg',
  },

  lifetimes: {
    ready: function () {
      const designer = this.data.designer
      this.setData({
        labelList: designer.label_list,
        style: designer.style,
        experienceHtml: designer.experience,
        name: designer.name,
      })
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {

  }
})