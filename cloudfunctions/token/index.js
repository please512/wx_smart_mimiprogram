// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  let appId='wx3e19c3a8a3292293'
  let appSecret='18db29a484a40484ef47bfad8bf7a3c1'
  let access_token_url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
  return await rp(access_token_url).then(function (res) {
      return res
    }).catch(function (err) {
      return err
    });
}