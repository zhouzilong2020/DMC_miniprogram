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
      // 不知道是什么的错误?
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
      console.log('after login', res);
      db.collection('users').where({
        _openid: res.result.openid
      }).get().then((res) => {
        if (res.data.length) {
          console.log('in getting userIndo res', res)
          wx.setStorageSync('userInfo', res.data[0])
          resolve(res.data[0])
        }
      }).catch((error) => {
        reject(error);
      })
    }).catch((error) => {
      reject(error);
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