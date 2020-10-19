// 云函数入口文件
var rp = require('request-promise');
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let uploadurl = `https://api.weixin.qq.com/tcb/uploadfile?access_token=${event.ACCESS_TOKEN}`;
  return await rp({
    url:uploadurl,
    method:'POST',
    body:{
      env:event.env,
      path:event.path
    },
    json:true
  }).then(function (res) {
    return res
  }).catch(function (err) {
    return err
  });
}