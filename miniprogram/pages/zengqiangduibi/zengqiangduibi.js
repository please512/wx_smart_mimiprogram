// miniprogram/pages/zhiwushibie/zhiwushibie.js
const db = wx.cloud.database({
  //这个是环境ID不是环境名称
  env:'please512'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
    token:'',
    base64:'',
    path:'',
    date:'',
    image:''
  },

  saveImage(e){
    var number = Math.random();
    wx.getFileSystemManager().writeFile({
      filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
      data: e.currentTarget.dataset.url.replace('data:image/png;base64,',''),
      encoding: 'base64',
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
          success: function (res) {
            wx.showToast({
              title: '保存成功',
            })
          },
          fail: function (err) {
            console.log(err)
          }
        })
        console.log(res)
      }, fail: err => {
        console.log(err)
      }
    })
  },

  sertIntoDB(){
    var that=this
    db.collection('CG_zengqiangduibi').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        description: "增强对比",
        time: that.data.date,
        // 为待办事项添加一个地理位置（113°E，23°N）
        avatarUrl:wx.getStorageSync('userInfo').avatarUrl,
        nickName:wx.getStorageSync('userInfo').nickName,
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  },

  start(e){
    var that=this
    console.log(e)
    if(e.detail.userInfo.nickName || wx.getStorageSync('userInfo')!==''){
      wx.setStorageSync('userInfo', e.detail.userInfo)
      that.setData({
        image:'',
      })
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (r) {
          console.log(r)
          wx.getFileSystemManager().readFile({
            filePath: r.tempFilePaths[0], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              var base64 = 'data:image/png;base64,' + res.data;
              that.setData({
                url:base64,
                base64:res.data,
                path:r.tempFilePaths[0]
              })
              wx.showLoading({
                title: '识别中',
                icon:'loading'
              })
              that.sertIntoDB()
              that.getToken()
              that.upload()
            },
            fail(err){
              console.log(err)
            }
          })
        }
      })
    }
  },
  upload(){
    var that=this
    wx.cloud.uploadFile({
      cloudPath:that.data.date+'.png',
      filePath:that.data.path,
      success(r){
        console.log(r)
      }
    })
  },
  getToken(){
    var that=this
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=OFQ9VWbnWf66nTGsICRkKTRP&client_secret=VyEZMQoCNw3FYoyUE2cKQ7HbjG6ajraX&',
      method:'post',
      success:(res)=>{
        if(res.statusCode===200){
          that.setData({
            token:res.data.access_token
          })
          that.sendPost()
        }
      }
    })
  },

  sendPost(){
    var that=this
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/image-process/v1/contrast_enhance',
      method:'post',
      data:{
        access_token:this.data.token,
        image:that.data.base64
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        console.log(res)
        if(res.statusCode===200 && res.data.image){
          that.setData({
            image:'data:image/png;base64,' + res.data.image
          })
          wx.hideLoading({
            success: (res) => {},
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let y=new Date().getFullYear()
    let m=(new Date().getMonth()+1<10)?'0'+(new Date().getMonth()+1):new Date().getMonth()+1
    let d=(new Date().getDate()<10)?'0'+new Date().getDate():new Date().getDate()
    let h=(new Date().getHours()<10)?'0'+new Date().getHours():new Date().getHours()
    let M=(new Date().getMinutes()<10)?'0'+new Date().getMinutes():new Date().getMinutes()
    let s=(new Date().getSeconds()<10)?'0'+new Date().getSeconds():new Date().getSeconds()
    let date=y+'_'+m+'_'+d+'___'+h+'_'+M+'_'+s
    this.setData({
      date:date
    })
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
    let nickName=wx.getStorageSync('userInfo').nickName
    let avatarUrl=wx.getStorageSync('userInfo').avatarUrl
    return {
      title: nickName?`${nickName}喊你一起玩，人工智能`:`李正阳喊你一起玩，人工智能`,
      imageUrl:nickName?avatarUrl:'/images/lzy.jpg',
      path: '/pages/smart/smart'//这是一个路径
    }
  }
})