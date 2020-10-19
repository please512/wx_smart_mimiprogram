var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    avatarUrl:'',
    swipeList:[{
      id:1,
      src:'../../images/banner1.jpg'
    },{
      id:2,
      src:'../../images/banner2.jpg'
    },{
      id:3,
      src:'../../images/banner3.jpg'
    },{
      id:4,
      src:'../../images/banner4.jpg'
    },{
      id:5,
      src:'../../images/banner5.jpg'
    },{
      id:6,
      src:'../../images/banner6.jpg'
    },{
      id:7,
      src:'../../images/banner7.jpg'
    }],
    piclist:[{
      name:'通用识别',
      url:'tongyongshibie'
    },{
      name:'植物识别',
      url:'zhiwushibie'
    },{
      name:'动物识别',
      url:'dongwushibie'
    },{
      name:'货币识别',
      url:'huobishibie'
    },{
      name:'地标识别',
      url:'dibiaoshibie'
    },{
      name:'车辆识别',
      url:'cheliangshibie'
    },{
      name:'LOGO识别',
      url:'logoshibie'
    },{
      name:'人流统计',
      url:'renliutongji'
    }],
    facelist:[{
      name:'人脸切割',
      url:'renlianqiege'
    },{
      name:'拉伸恢复',
      url:'lashenhuifu'
    },{
      name:'增强对比',
      url:'zengqiangduibi'
    },{
      name:'图像去雾',
      url:'tuxiangquwu'
    }],
    audiolist:[{
      name:'语音识别',
      url:'yuyinshibie'
    },{
      name:'语音合成',
      url:'yuyinhecheng'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },

  init(){
    this.setData({
      nickName:wx.getStorageSync('nickName'),
      avatarUrl:wx.getStorageSync('avatarUrl')
    })
  },

  navi(e){
    wx.navigateTo({
      url:`../${e.currentTarget.dataset.url}/${e.currentTarget.dataset.url}`,
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