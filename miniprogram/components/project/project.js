// components/project.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageData:{
      type: Array,
      value:[{
        src : "../../images/slide-images/南丹·邻里汇.png" ,
        title : "南丹·邻里汇" ,
      }],
    }
  },
  options:{
    addGlobalClass:true,
  },

  /**
   * 组件的初始数据
   */
  data: function(){
    return{
      
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log("component created", this.data)
      this.setData({
        imageData: this.data.imageData
      })
    },
  }
})
