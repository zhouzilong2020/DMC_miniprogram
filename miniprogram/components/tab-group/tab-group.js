// components/tab-group/tab-group.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },
  externalClasses: ['box-class'],
  /**
   * 组件的初始数据
   */
  data: {
    tabs: [{
      label: '示范项目',
      icon: 'fas fa-info'
    }, {
      label: '近期动态',
      icon: 'fas fa-building'
    }, {
      label: '设计师',
      icon: 'fas fa-pen'
    }],
    curTabIdx: 0,
    barWidth: 0,
    barLeft: 0
  },
  lifetimes: {
    ready: function () {
      this.changeTab({
        currentTarget: {
          id: 0
        }
      });
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeTab: function (e) {
      const query = wx.createSelectorQuery().in(this);
      query
        .select(`#label-${e.currentTarget.id}`)
        .boundingClientRect((res) => {
          this.setData({
            curTabIdx: e.currentTarget.id,
            barWidth: `${res.width}px`,
            barLeft: `${res.left}px`,
          })
        })
        .exec();

      this.triggerEvent('onTabChange', {
        id: e.currentTarget.id
      }, {
        bubbles: true
      })
    },
  }
})