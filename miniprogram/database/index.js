const db = wx.cloud.database()
const _ = db.command


let resuly = []
db.collection('news')
  .orderBy('create_time', 'desc')
  .get()
  .then(res => {
    const fileList = []
    exemplaryProjectResult = res.data
    console.log(exemplaryProjectResult)
    for (let i = 0, len = exemplaryProjectResult.length; i < len; i++) {
      fileList.push(exemplaryProjectResult[i].image_list[0])
    }
    wx.cloud.getTempFileURL({
      fileList: fileList,
      success: res => {
        const tempFileUrlList = res.fileList
        for (let i = 0, len = tempFileUrlList.length; i < len; i++) {
          exemplaryProjectResult[i].image = tempFileUrlList[i]
        }
      }
    })
  })