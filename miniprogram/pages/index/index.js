// miniprogram/pages/index/index.js
const db = wx.cloud.database();
import {
  whoAmI,
  login,
  getUserProfileAndAddUser,
  checkIfRegistered
} from '../../utils/userInfo'

import {
  getTempFileURL
} from "../../utils/download"
Page({
  /**
   * 页面的初始数据
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
    demoList: [],
    newsList: [],
    designerList: [],
  },

  onLoad: async function () {
    // 没有注册，则授权！
    checkIfRegistered().catch(e => {
      wx.getUserProfile({
        desc: '用于获取您的相关信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          addUser(res.userInfo).then(res => {
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true,
            })
          })
        },
        fail: e => {
          console.log(e, '授权失败')
        }
      })
    })
    const that = this
    that.requestData()
  },

  requestData: async function () {
    const that = this
    db.collection('example_project')
      .orderBy('create_time', 'desc')
      .get()
      .then(async (res) => {
        let demoResult = res.data
        for (let i = 0, len = demoResult.length; i < len; i++) {
          demoResult[i].image = demoResult[i].image_list[0]
        }
        that.setData({
          demoList: demoResult
        })
        // console.log(that.data.demoList)
      })
    db.collection('news')
      .orderBy('create_time', 'desc')
      .get()
      .then(async (res) => {
        const fileList = []
        let newsResult = res.data
        // 首页数据只取第一张！
        for (let i = 0, len = newsResult.length; i < len; i++) {
          fileList.push(newsResult[i].image_list[0])
        }
        var tempFileURLList = await getTempFileURL(fileList)
        // 更新filURL
        for (let i = 0, len = newsResult.length; i < len; i++) {
          newsResult[i].image = tempFileURLList[i]
        }
        that.setData({
          newsList: newsResult
        })
      })
    db.collection('designer')
      .orderBy('create_time', 'desc')
      .get()
      .then(async (res) => {
        that.setData({
          designerList: res.data
        })
      })
  },

  onTabChange: function (e) {
    this.setData({
      curTabIdx: e.detail.id
    })
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  }
})