const db = wx.cloud.database();
import {
  getAttrMapping
} from './utils'
import {
  tableKey
} from './table'

// export function addUser( payload) {
//   const _cur_date = new Date().toString()
//   return new Promise((resolve, reject) => {
//     try {
//       db.collection('user').add({
//         data: {
//           nickname: payload.nickName,
//           avatar: payload.avatarUrl,
//           mobile: null,
//           location: null,
//           // 1 for citizen
//           type: 1,
//           // project key
//           relevant_project_id_list: [],

//           // 这里直接通过_openid来获取
//           // my_project_id_list: [],

//           // questionnaire key
//           // {id, done:true/false}
//           questionnarie_id_list: [],

//           // message key
//           // {id, read:true/false}
//           message_id_list: [],

//           // comment key
//           punlished_comment_id_list: [],

//           // time
//           last_login_time: _cur_date,
//           create_time: _cur_date,
//           update_time: _cur_date,
//         },
//         success: res => {
//           resolve(res)
//         },
//         fail: err => {
//           reject(err)
//         }
//       })
//     } catch (err) {
//       reject(err)
//     }
//   })
// }