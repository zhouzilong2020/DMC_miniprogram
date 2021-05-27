// miniprogram/pages/publish/publish.js
import {
  chooseLocation,
  url
} from "../../utils/map"
import {
  uploadImage,
  deleteImage
} from "../../utils/upload"

import {
  db
} from "../../utils/config"


Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    tempFilePaths: [],
    spaceTypes: ['商业类畸形空间', '休闲型畸形空间', '文化型畸形空间', '社交性畸形空间', '废弃型畸形空间'],
    spaceTypeIdx: -1,
    location: '',
    desc: '',
    isComplete: true,
  },
  onTitleChange: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  onInputChange: function (e) {
    this.setData({
      desc: e.detail.value
    })
  },

  async onSubmitForm() {
    const that = this
    try {
      const fileIdList = await uploadImage(this.data.tempFilePaths)
      const timestamp = new Date().toString()
      // 数据入库
      const res = await db.collection('project1')
        .add({
          data: {
            title: that.data.title,
            status: 1, // 新发布状态,待评审
            status_time_list: [timestamp],
            image_list: fileIdList,
            location: that.data.location,
            space_type: that.data.spaceTypes[that.data.spaceTypeIdx],
            // questionnaire key
            relevant_questionnaire_id_list: [],
            // open_id!!!!
            // publish_user_id: 'publish_user_id',
            relevant_user_id: [],
            view_cnt: 0,
            create_time: timestamp,
            update_time: timestamp,
          }
        })
      // 发布成功
      if (res) {
        wx.navigateTo({
          url: '../mes_success/mes_success?_id=' + res._id,
        })
      }
    } catch (err) {
      // 任意一条失败则删除已经成功上传的文件
      deleteImage(err.fileIdList)
    }
  },

  checkCompleteness() {
    if (this.data.tempFilePaths.length > 0 && this.data.spaceTypeIdx !== -1 && this.data.location !== '') {
      this.setData({
        isComplete: true,
      })
    }
  },

  bindSpaceTypeChange(e) {
    this.setData({
      spaceTypeIdx: e.detail.value
    })
    this.checkCompleteness()
  },

  // 获取地图点位
  onRegionTap(e) {
    wx.navigateTo({
      url,
    })
    this.checkCompleteness()
  },

  // 上传图片
  bindUploadImage(e) {
    const that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths: that.data.tempFilePaths.concat(tempFilePaths)
        })
        console.log(that.data.tempFilePaths)
      },
      complete() {
        that.checkCompleteness()
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {



  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 监听回调，得到用户地图选点信息
    const location = chooseLocation.getLocation()
    this.setData({
      location
    })
    this.checkCompleteness()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    chooseLocation.setLocation(null);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})