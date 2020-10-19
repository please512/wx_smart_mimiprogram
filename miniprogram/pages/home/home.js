var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl:'https://mp.weixin.qq.com/wxopen/basicprofile?action=get_headimg&token=1244420004&t=1589543043166',
    auto:false
  },

  onGetUserInfo(e){
    console.log(e)
    if(e.detail.userInfo){
      wx.setStorageSync("avatarUrl", e.detail.userInfo.avatarUrl)
      wx.setStorageSync("nickName", e.detail.userInfo.nickName)
      // app.globalData.avatarUrl=
      // app.globalData.nickName=e.detail.userInfo.nickName
      console.log(app.globalData.userInfo)
      wx.showToast({
        title: '授权成功',
        icon:'success',
        duration:1000,
      })
      setTimeout(()=>{
        wx.navigateTo({
          url: '../smart/smart',
        })
      },1000)
    }else{
      // 退出小程序
    }
  },

  init(){
    wx.showLoading({
      title: '请稍候',
    })
    var that=this
    wx.getSetting({
      success:(e)=>{
        console.log(e)
        if(e.authSetting["scope.userInfo"]){
          wx.hideLoading({
            complete: (res) => {
              wx.navigateTo({
                url: '../smart/smart',
              })
            },
          })
        }else{
          console.log('未授权个人信息')
          wx.hideLoading({
            complete: (res) => {
              that.setData({
                auto:true
              })
              console.log(this.data.auto)
            },
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
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

  }
})