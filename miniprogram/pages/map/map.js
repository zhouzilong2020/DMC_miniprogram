// miniprogram/pages/map/map.js
const db = wx.cloud.database();
const app = getApp();


Page({
  /**
   * 页面的初始数据
   */
  data: {
    longitude : 121.501837,
    latitude : 31.282640,
    path:"/images/company.png",
    accuracy:10,
    markers: [{
      id: 0,
      latitude: 31.282640,
      longitude: 121.501837,
    }],
   
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
    var newMarkers = []
    var that = this;
    db.collection('images').orderBy('timestamp', 'asc').field({
      formData : true,
    }).get().then((res) => {
      for(var i = 0, len = res.data.length; i < len; i++){
        newMarkers = newMarkers.concat({latitude : res.data[i].formData.latitude, 
                                        longitude : res.data[i].formData.longitude,
                                        id : i+1});
      }
      that.setData({
        markers : that.data.markers.concat(newMarkers)
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },

  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },

  uploadPhoto(){
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success:(res) =>{

        wx.showLoading({
          title: '正在上传',
        })
        const filePath = res.tempFilePaths[0];
        const cloudPath = '' + filePath.match(/\.[^.]+?$/)[0];
        //上传图片
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: filePath,
          success:(res)=>{
            console.log(res);
          },
          // 上传完成
          complete: () => {
            wx.hideLoading()
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000,
            })
            
          }
        });

      }
    });
  }
  
})