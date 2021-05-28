import {
  db,
  _
} from "../../utils/config"
import {
  whoAmI
} from "../../utils/userInfo"
import {
  scanCode
} from "../../utils/QRcode"

// miniprogram/pages/my-project/my-project.js
Page({
  data: {
    statuses: ['提交', '评审', '设计', '投票', '施工', ],
    ongoingCnt: 0,
    publishCnt: 0,
    completeCnt: 0,

    relevantProjectList: [],
    myProjectList: [],
  },
  onLoad: async function () {
    const that = this
    const res = (await db.collection('user').get()).data[0]
    var relevantProjectList = res.relevant_project_id_list
    // 得到所有peoject id list
    db.collection('project1')
      .orderBy('update_time', 'desc')
      .where({
        _id: _.in(relevantProjectList)
      })
      .get()
      .then(src => {
        const releventProjectResult = src.data
        this.setStatistic(releventProjectResult, false)
        this.setData({
          relevantProjectList: releventProjectResult,
        })
        console.log(this.data.relevantProjectList)
      })

    const userInfo = await whoAmI()
    // 得到所有 用户发布的 peoject id list
    db.collection('project1')
      .orderBy('update_time', 'desc')
      .where({
        _openid: userInfo._openid
      })
      .get()
      .then(src => {
        const projectResult = src.data
        this.setStatistic(projectResult, true)
        this.setData({
          myProjectList: projectResult,
        })
      })
  },
  onCameraOpen: function () {
    scanCode()
      .then(e => {
        console.log(e)
        wx.showToast({
          title: '加入成功',
        })
      })
      .catch(e => {
        wx.showToast({
          title: '加入失败，请稍后再试',
          icon: 'error'
        })
        console.log(e)
      })
  },
  setStatistic: function (projectList, isMyPublished = false) {
    const that = this
    var o_cnt = 0
    var p_cnt = isMyPublished ? projectList.length : 0 // 发布的项目，仅有我自己发布的项目才统计
    var c_cnt = 0

    for (let i = 0, len = projectList.length; i < len; i++) {
      const status = projectList[i].status
      switch (status) {
        case 1: // 这个是刚发布的项目，要么已经在p_cnt中统计了，要么不统计
          break;
        case 5: // 已完成的项目
          c_cnt += 1
          break;
        default: // 其他所有的中间状态都是正在进行中
          o_cnt += 1
      }
    }
    this.setData({
      ongoingCnt: that.data.ongoingCnt + o_cnt,
      publishCnt: that.data.publishCnt + p_cnt,
      completeCnt: that.data.completeCnt + c_cnt,
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