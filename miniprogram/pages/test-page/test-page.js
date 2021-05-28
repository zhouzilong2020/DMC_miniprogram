import {
  db,
  _
} from '../../utils/config'
import {
  whoAmI,
  login,
  addUser
} from '../../utils/userInfo'

function getIntersection(list1, list2) {
  let _s2 = new Set(list2)
  return list1.filter(x => !_s2.has(x))
}

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    hasChecked: false,
    canIUseGetUserProfile: true,
  },
  test(a) {
    console.log(a)
    console.log(typeof (a))
  }, 
  getUserProfileAndAddUser(e) {
    const that = this
    wx.getUserProfile({
      desc: '用于获取您的相关信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        addUser(res.userInfo).then(res => {
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
          console.log('注册成功', res)
        })
      },
      fail: e => {
        console.log(e)
      }
    })
  },
  onLoad: async function () {
    await this.checkIfRegistered()
    this.setData({
      hasChecked: true
    })

  },

  async checkIfRegistered(e) {
    var userInfo = ''
    const that = this
    try {
      userInfo = await whoAmI()
      that.setData({
        userInfo: res.userInfo,
        hasUserInfo: true,
      })
    } catch (e) {
      try {
        userInfo = await login()
        console.log(userInfo)
        that.setData({
          userInfo: userInfo,
          hasUserInfo: true,
        })
      } catch (e) {
        // 用户未注册
        console.log(e)
      }
    }

  },
})