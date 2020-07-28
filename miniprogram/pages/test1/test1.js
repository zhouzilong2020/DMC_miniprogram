const app = getApp()
wx.cloud.init({
  env:'test-0xsoi',
})
Page({
  data: {
    //   错误提示
     error:'',
    //   输入控制
     rules:[{
        name: 'type',
            rules: {required: true, message: '请选择畸形空间分类'},
    },{
        name: 'mobile',
            rules: [{required: true, message: '请填写手机号'}, {mobile: true, message: '请输入正确的手机号'}],
    },{
        name: 'latitude',
            rules: [{required: true, message: '请获取您的位置'}],
    },{
        name: 'imageCnt',
        rules: [{required: true, message: '请至少上传一张畸形地块的照片'}],
    }],
    //   输入文本框
      inputLength :0,
    //   地图信息
      scale:16,
      latitude: 31.289027,
      longitude: 121.508532,
      markers:[{id:0,
                latitude: 31.289027,
                longitude: 121.508532,
                // label:{
                //     content:"同济大学(四平路校区)",
                //     color: '#707070',
                // }
            }],
    //   用户提交的表单信息
      formData:{type:'',
                latitude:'',
                longitude:'',
                mobile:'',
                imageCnt:0,
                urls:[],},
    //   选项框
      radioItems:[
          {name:"商业型畸零空间", value:'0'},
          {name:"休闲型畸零空间", value:'1'},
          {name:"文化型畸零空间", value:'2'},
          {name:"社交型畸零空间", value:'3'},
          {name:"废弃型畸零空间", value:'4'}
      ],
    //   照片上传
      files: [],
  },
  onLoad() {
      this.setData({
          selectFile: this.selectFile.bind(this),
          uplaodFile: this.uplaodFile.bind(this)
      })
  },

//   提交表单
    submitForm: function(e) {
        this.selectComponent('#form').validate((valid, errors) => {
            console.log('valid', valid, errors)
            if (!valid) {
                // 如果不通过，展示第一条错误信息
                const firstError = Object.keys(errors)
                if (firstError.length) {
                    this.setData({
                        error: errors[firstError[0]].message
                    })
                }
            } else {
                wx.showToast({
                    title: "提交成功！"
                })
            }
        })
    },
    // submitForm: function(e){
    //     this.selectComponent('#form').validate((valid, errors) =>{
    //         console.log('valid', valid, errors);
    //         // 如果出错
    //         if(errors.length){
    //             for( let i = 0, len = errors.length; i < len; i++){
    //                 if (errors[i].name == "type"){
    //                     this.setData({
    //                         typeError: errors[i].message
    //                     });
    //                 }
    //                 else{
    //                     this.setData({
    //                         mobileError: errors[i].message
    //                     });
    //                 }
    //             }
    //             return ;
    //         }
    //         else{
    //             // 上传表单。。。
    //         }
    //     })
    // },
//   输入手机号
    phoneInputHandle: function(e){
        this.setData({
            ['formData.mobile']:e.detail.value
        })
    },

//   获取位置信息
    getPos: function(e){
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            success(res){
                console.log("location got", res);
                that.setData({
                    scale:18,
                    latitude: res.latitude,
                    longitude: res.longitude,
                    ['markers[0].latitude']: res.latitude,
                    ['markers[0].longitude']: res.longitude,
                    ['formData.latitude']: res.latitude,                    
                    ['formData.longitude']: res.longitude,
                })
            }
        })
    },

//   填充相关信息
    inputHandle: function(e){
        this.setData({
            inputLength: e.detail.cursor,
        })
    },

//   选择畸形空间的分类变化
    radioChange: function (e) {
        // console.log('radio发生change事件，携带value值为：', e.detail.value);
        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
        }
        this.setData({
            radioItems: radioItems,
            [`formData.type`]: e.detail.value  //存在这里！
        });
    },

//   选择照片
  chooseImage: function (e) {
      var that = this;
      wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              that.setData({
                  files: that.data.files.concat(res.tempFilePaths)
              });
          }
      })
  },
  previewImage: function(e){
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.files // 需要预览的图片http链接列表
      })
  },
  selectFile(files) {
      console.log('files', files)
      // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
      console.log('upload files', files)
      // 文件上传的函数，返回一个promise
      return new Promise((resolve, reject) => {
            console.log("data:", this.data);
            for (let i = 0; i < files.tempFilePaths.length; i++){
                this.setData({
                    files: this.data.files.concat({url:files.tempFilePaths[i], loading:false}),
                    ['formData.urls'] : this.data.formData.urls.concat(files.tempFilePaths[i]),
                    ['formData.imageCnt'] : this.data.formData.imageCnt+1,
                })
            }

      })
  },
  uploadError(e) {
      console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
      console.log('upload success', e.detail)
  }
});