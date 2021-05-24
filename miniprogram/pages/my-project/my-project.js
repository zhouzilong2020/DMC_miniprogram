import {
  db
} from "../../utils/config"
import {
  getrelevantProject
} from "../../database/project"

// miniprogram/pages/my-project/my-project.js
Page({
  data: {
    relevantProjectList:[],
    myProjectList:[],
  },
  onLoad: function () {
    var res = wx.getStorageSync('userInfo')
    db.collection('user')
      .get()
      .then(res => {
        
      })

  },


  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  }
})