const env = 'debug'

const systemDateAttr = ['create_time', 'update_time']
/**
 * 由key中定义的表中的字段名字，从value中获取相应字段，并建立映射关系
 * @param {*} key table的表的key值
 * @param {*} value 对应字段的value
 */
export function getAttrMapping(key, value) {
  // 当前时间
  const _cur_date = new Date()
  // 返回结果
  var _key_value_map = {}
  delete key['_name']
  for (var _key in key) {
    if (value[_key]) {
      _key_value_map[_key] = value[_key]
    } else if (_key in systemDateAttr) { // 如果字段是系统添加字段
      _key_value_map[_key] = _cur_date
    } else if (env === 'debug') {
      console.log(`missing value of ${_key}`)
    }
  }
  return _key_value_map
}

/**
 * 将本地照片上传至数据库，得到云端的path
 * @param {*} payload 
 */
export function uploadImage(payload) {
  return new Promise((resolve, reject) => {
    try {
      const _timestamp = Date.parse(new Date())
      const _tempImagePaths = payload.tempImagePaths
      const _user_open_id = payload.open_id
      var _cloudPaths = []
      for (var _tempFilePath in tempImagePaths) {
        _cloudPaths.push('./' + _user_open_id + '/' + _timestamp + '_' + i + _tempFilePath.match(/\.[^.]+?$/)[0])
      }
      wx.cloud.uploadFile({
        cloudPath: _cloudPaths, //云
        filePath: _tempImagePaths, //本地
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}