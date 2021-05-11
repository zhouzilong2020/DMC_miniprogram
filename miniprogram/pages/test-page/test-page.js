import {
  db
} from '../../utils/config'
import {
  whoAmI,
  login
} from '../../utils/userInfo'
const _ = db.command

function getIntersection(list1, list2) {
  let _s2 = new Set(list2)
  return list1.filter(x => !_s2.has(x))
}
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: true,
  },
  test(a) {
    console.log(a)
    console.log(typeof (a))
  },
  async onLoad() {

    // var res = await wx.cloud.callFunction({
    //   name: 'checkMyProject',
    //   data: {}
    // })
    // console.log(res)
    const open_id = 'oCcu25IybavSygtQIelfGGHFumAs'

    var res = await db.collection('user').where({
      _openid: open_id
    }).get()
    const user_res = res.data[0]
    // console.log(user_res)

    var project_id_check_list = []
    for (var project_id of user_res.relevent_project_id_list) {
      // console.log(project_id)
      project_id_check_list.push(project_id)
    }
    for (var project_id of user_res.my_project_id_list) {
      project_id_check_list.push(project_id)
    }
    // console.log(project_id_check_list)

    const user_last_login_time = user_res.last_login_time
    res = await db.collection('project1').where({
      _id: _.in(project_id_check_list),
      // update_time: _.gte(user_last_login_time),
      status: _.gte(3) // 进入了投票后的阶段
    }).get()
    const project_res = res.data

    var questionnaire_check_list = []
    for (var project of project_res) {
      questionnaire_check_list.push(...project.relevant_questionnaire_id_list)
    }
    // 减去用户已经做过的
    const todo_list = user_res.todo_questionnaire_list
    const done_list = user_res.done_questionnaire_list
    questionnaire_check_list = getIntersection(questionnaire_check_list, todo_list)
    questionnaire_check_list = getIntersection(questionnaire_check_list, done_list)

    if (questionnaire_check_list.length) {
      const add_res = await db.collection('user')
        .doc(user_res._id)
        .update({
          data: {
            todo_questionnaire_list: _.push(questionnaire_check_list)
          }
        })
      console.log("added")
    }else{
      console.log("no")
    }
    
  },


  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于获取您的相关信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        const _user_info = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      },
      fail: e => {
        console.log(e)
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})