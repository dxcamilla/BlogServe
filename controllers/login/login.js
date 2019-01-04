const jwt = require('jsonwebtoken')
const jwtConf = require('../../config')
const User = require('../../models/User')
const status = require('../../tools/statusCode')
module.exports = (req, res) => {
  let { userAccount, pwd } = req.body;
  User.findOne({
    userAccount: userAccount,
    password: pwd
  }).then(userInfo => {
    if (userInfo) {
      const userpayload = {
        _id: userInfo._id,
        userAccount: userInfo.userAccount,
        userName: userInfo.userName,
        isAdmin: userInfo.isAdmin,
        superAdmin: userInfo.superAdmin
      }
      let token = jwt.sign(userpayload, jwtConf.secret, { algorithm: 'RS256', expiresIn: jwtConf.expires })
      resData = {
        resCode: status.success,
        resMsg: "登录成功",
        userInfo: userpayload,
        userToken: token
      }
      console.log(resData)
    } else {
      resData = {
        resCode: status.error,
        resMsg: "账号或密码错误"
      }
    }
  }).catch(function (err) {
    resData = {
      resCode: status.fail,
      resMsg: "出了个bug~~"
    }
    console.log('catched:', err);
  })
  return res.json(resData);
}