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
        console.log('no userInfo in storage, begin to login !')
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
      const _user_open_id = res.result.openid
      db.collection('user').where({
        _openid: res.result.openid
      }).get().then((res) => {
        // 数据库中有该用户
        if (res.data.length) {
          var _user_info = res.data[0]
          // console.log('in getting userIndo res', _user_info)
          wx.setStorageSync('userInfo', _user_info)
          resolve(_user_info)
        } else { // 数据库中没有该用户，插入一条新的，这里需要getUserProfile，需要获取用户权限
          reject({
            code: 404
          })
        }
      }).catch((err) => {

        reject(error);
      })
    }).catch((err) => {
      reject(err);
    })
  })
}

/**
 * 返回用户信息,先检查localstorage,如果没有则登录, 如果二者均失败则reject
 */
export async function getUserInfo() {
  return new Promise((resolve, reject) => {
    whoAmI().then(res => {
      resolve(res);
    }).catch(e => {
      login().then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      })
    })
  })

}