// components/article.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    news: {
      type: Object,
      observer: function (evl) {
        this.setData({
          title: evl.title,
          subtitle: evl.subtitle,
          author: evl.author,
          createTime: new Date(evl.create_time).Format("yyyy-MM-dd"),
          image: evl.image,
          contentHtml: evl.content,
        })
      },
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: '“活力四射”-发起睦邻活动',
    subtitle: '——上海市杨浦区延吉新村街道第二睦邻中心',
    author: '城市微新团队',
    contentHtml: '',
    createTime: '2020-03-08',
    image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3026939796,485761977&fm=26&gp=0.jpg',
  },
  lifetimes: {
    ready: function () {
      const that = this
      this.setData({
        title: that.data.news.title,
        subtitle: that.data.news.subtitle,
        author: that.data.news.author,
        createTime: new Date(that.data.news.create_time).Format("yyyy-MM-dd"),
        image: that.data.news.image,
        contentHtml: that.data.news.content,
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})