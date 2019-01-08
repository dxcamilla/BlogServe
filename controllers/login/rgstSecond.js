const User = require('../../models/User')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    var { userAccount, userName, pwd1, pwd2, isForgetPwd } = req.body;
    if (isForgetPwd) {
      if (pwd1 != pwd2) {
        resData = {
          resCode: status.error,
          resMsg: "两次密码不一致"
        }
        return res.json(resData);
      }
      const data = await User.update({
        userAccount: userAccount
      }, {
          password: pwd1
        });
      resData = {
        resCode: status.success,
        resMsg: "修改成功"
      }
    } else {
      const userInfo = await User.findOne({
        userAccount: userAccount
      });
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
        userName: userName || "小可爱_" + userAccount.substr(0, 5),
        password: pwd1
      });
      resData = {
        resCode: status.success,
        resMsg: "注册成功"
      }
      user.save();
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData);
}