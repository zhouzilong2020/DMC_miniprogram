import {
  db,
  _
} from "../../utils/config"
import {
  getTempFileURL
} from "../../utils/download"
import {
  getrelevantProject
} from "../../database/project"

// miniprogram/pages/my-project/my-project.js
Page({
  data: {
    relevantProjectList: [],
    myProjectList: [],
  },
  onLoad: async function () {
    const res = (await db.collection('user').get()).data[0]
    console.log(res)
    var allProjectList = res.relevent_project_id_list.concat(res.my_project_id_list)
    const splitIdx = res.relevent_project_id_list.length
    // 得到所有peoject id list
    const projectResult = await db.collection('project1')
      .orderBy('update_time', 'desc')
      .where({
        _id: _.in(allProjectList)
      })
      .get()
    // 得到所有 peoject list 中的照片
    const projectFileList = []
    for (let i = 0, len = projectResult.data.length; i < len; i++) {
      projectFileList.push(projectResult.data[i].image_list[0])
    }

    const projectImageList = await getTempFileURL(projectFileList)
    for (let i = 0, len = projectResult.data.length; i < len; i++) {
      projectResult.data[i].image = projectImageList[i]
    }
    this.setData({
      relevantProjectList: projectResult.data.slice(0, splitIdx),
      myProjectList: projectResult.data.slice(splitIdx)
    })
    console.log(this.data)

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