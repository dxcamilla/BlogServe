const User = require('../../models/User')
const Mailcode = require('../../models/Mailcode')
const mailer = require('../../routes/mailer')
const status = require('../../tools/statusCode')
module.exports = (req, res) => {
  let { userAccount, isForgetPwd } = req.body;
  User.findOne({
    userAccount: userAccount
  }).then(userStatus => {
    if (!isForgetPwd) {
      if (userStatus) {
        resData = {
          resCode: status.exist,
          resMsg: "该账号已存在"
        }
        return res.json(resData);
      }
    }
    let validCode = parseInt((Math.random() * 9 + 1) * 100000),
      validTime = Date.now() + 1000 * 60 * 30 + 30;
    let mail = new Mailcode({
      userAccount: userAccount,
      code: validCode,
      date: validTime,
      islive: true
    });
    mailer({
      from: "不见君来 <dx_hlove@163.com>__dx的个人博客",
      subject: "dx个人博客邮箱验证码",
      to: userAccount,
      text: '您的验证码是:《 ' + validCode + ' 》，30分钟内有效，这是我们的秘密，我不会泄密哦，您也要保密哦'
    });
    return mail.save();
  }).then(newRgstInfo => {
    console.log(newRgstInfo)
    resData = {
      resCode: status.success,
      resMsg: "验证码发送成功，请打开邮箱查收"
    }
  }).catch(err => {
    console.log('catched:', err);
    resData = {
      resCode: status.fail,
      resMsg: "出了个bug~~"
    }
  });
  return res.json(resData)
}