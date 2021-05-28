// components/project-timeline.js
import {
  _,
  db
} from "../../utils/config"
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    _id: {
      type: String,
      value: 'asjdsa124'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    step: {
      type: Number,
      value: 1
    },
    timeStamp: {
      type: Date,
      observer: function (newEvl) {
        this.setData({
          timeStamp: new Date(newEvl).Format('yyyy-MM-dd')
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    content: [
      '项目提交成功啦！',
      '项目通过评审啦！',
      '项目设计方案成功提交啦！',
      '项目投票结束啦！',
      '项目施工完毕啦！',
    ]
  },
  lifetimes: {
    ready: async function () {
      const that = this
      try {
        // 有button，并且没有被disable
        if (this.data.step === 2 || this.data.step === 3 && !this.data.disabled) {
          const _id = this.data._id
          const qResult = (await db.collection('questionnaire1')
            .where({
              relevant_project_id: _id
            }).field({
              hash: true,
              sid: true,
            }).get()).data[0]
          this.setData({
            sid: qResult.sid,
            hash: qResult.hash,
          })
          // console.log(this.data)
        }
      } catch (e) {
        // console.log(e)
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (e) {
      // 2 去投票
      // 3 看结果
      if (!this.data.disabled) {
        // console.log(this.data.step)
        wx.navigateToMiniProgram({
          appId: 'wxebadf544ddae62cb',
          path: `pages/survey/index?sid=${this.data.sid}&hash=${this.data.hash}`,
        })
      }
    }
  },

})