const User = require('../../models/User')
const status = require('../statusCode')
resData = {
  resCode: status.success,
  resMsg: ""
}
module.exports = (req, res) => {
  var { userAccount, userName, pwd1, pwd2, isForgetPwd } = req.body;
  if (isForgetPwd) {
    if (pwd1 != pwd2) {
      resData = {
        resCode: status.error,
        resMsg: "两次密码不一致"
      }
      return res.json(resData);
    }
    User.update({
      userAccount: userAccount
    }, {
        password: pwd1
      }).then(data => {
        resData = {
          resCode: status.success,
          resMsg: "修改成功"
        }
        category.save();
      }).catch(err => {
        console.log('catched:', err);
        resData = {
          resCode: status.fail,
          resMsg: "修改失败"
        }
      })
  } else {
    User.findOne({
      userAccount: userAccount
    }).then(userInfo => {
      if (userInfo) {
        resData = {
          resCode: status.exist,
          resMsg: "该账号已存在"
        }
        return res.json(resData);
      }
      if (pwd1 != pwd2) {
        resData = {
          resCode: status.error,
          resMsg: "两次密码不一致"
        }
        return res.json(resData);
      }
      var user = new User({
        userAccount: userAccount,
        userName: userName,
        password: pwd1
      });
      resData = {
        resCode: status.success,
        resMsg: "注册成功"
      }
      user.save();
    }).catch(function (err) {
      console.log('catched:', err);
      resData = {
        resCode: status.fail,
        resMsg: "出了个bug~~"
      }
    })
  }
  return res.json(resData);
}