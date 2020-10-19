//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.login({
        success(r){
          console.log(r.code)
          wx.request({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx3e19c3a8a3292293&secret=86ab1d7049de8b7ceca7ea73fc1f8388&js_code=${r.code}&grant_type=authorization_code`,
            success(res){
              wx.setStorageSync('openid', res.data.openid)
            }
          })
        }
      })
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'please512',
        traceUser: true,
      })
    }

    this.globalData = {
      nickName:'',
      avatarUrl:''
    }
  },
  
  tounicode(hanzi){
    if(hanzi == '') return '请输入汉字';
    var str =''; 
    for(var i=0;i<hanzi.length;i++){
       str+="\\u"+parseInt(hanzi[i].charCodeAt(0),10).toString(16);
    }
    console.log('编码改为'+str.replace(/\\/g, "_"))
    return str.replace(/\\/g, "_");
  },
  tohanzi(unicode){
    // if(unicode == '') return '请输入十六进制unicode';
    unicode = unicode.split("_u");
    var str ='';
    for(var i=0;i<unicode.length;i++){
        str+=String.fromCharCode(parseInt(unicode[i],16).toString(10));
    }
    return str.slice(1,str.length);
  }
})
