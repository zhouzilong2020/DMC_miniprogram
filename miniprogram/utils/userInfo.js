import {
  app,
  db,
} from './config'

/**
 * 返回存储在storage中的userInfo,如果没有则reject
 */
export async function whoAmI() {
  return new Promise((resolve, reject) => {
    try {
      var res = wx.getStorageSync('userInfo')
      // 获取数据成功
      if (res._id) {
        resolve(res)
      }
      // 登录失败
      else {
        console.log('no userInfo in storage, need to login or register!')
        reject()
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 登录用户,如果登录失败则reject
 */

export async function login() {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'login',
      data: {}
    }).then((res) => {
      console.log(res)
      const _user_open_id = res.result.openid
      db.collection('user')
        .where({
          _openid: _user_open_id
        })
        .get()
        .then((res) => {
          // 数据库中有该用户
          if (res.data.length) {
            console.log(res)
            var _user_info = res.data[0]
            // console.log('in getting userIndo res', _user_info)
            wx.setStorageSync('userInfo', _user_info)
            resolve(_user_info)
          } else { // 数据库中没有该用户，插入一条新的，这里需要getUserProfile，需要获取用户权限
            reject("没有该用户")
          }
        }).catch((err) => {
          console.log('re')
          reject(err);
        })
    }).catch((err) => {
      reject(err);
    })
  })
}

export async function addUser(payload) {
  const _cur_date = new Date().toString()
  return new Promise((resolve, reject) => {
    console.log(payload)
    try {
      const data = {
        nickname: payload.nickName,
        avatar: payload.avatarUrl,
        mobile: null,
        location: null,
        // 1 for citizen
        type: 1,
        // project key
        relevant_project_id_list: [],

        // 这里直接通过_openid来获取
        // my_project_id_list: [],

        // questionnaire key
        // {id, done:true/false}
        questionnarie_id_list: [],

        // message key
        // {id, read:true/false}
        message_id_list: [],

        // comment key
        punlished_comment_id_list: [],

        // time
        last_login_time: _cur_date,
        create_time: _cur_date,
        update_time: _cur_date,
      }
      db.collection('user')
        .add({
          data,
          success: res => {
            wx.setStorageSync('userInfo', data)
            resolve(data)
          },
          fail: err => {
            reject(err)
          }
        })
    } catch (err) {
      reject(err)
    }
  })
}

export async function checkIfRegistered() {
  return new Promise(async (resolve, reject) => {
    var userInfo
    try {
      userInfo = await whoAmI()
      resolve(userInfo)
    } catch (e) {
      try {
        userInfo = await login()
        resolve(userInfo)
      } catch (e) {
        // 用户未注册
        reject(e)
      }
    }
  })
}

export function getUserProfileAndAddUser(e) {
  return new Promise((resolve, reject) => {
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
  })
}