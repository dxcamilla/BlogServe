const User = require('../../models/User')
const Mailcode = require('../../models/Mailcode')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    let { userAccount, mailCode, isForgetPwd } = req.body;
    const userInfo = await User.findOne({
      userAccount: userAccount
    })
    if (!isForgetPwd) {
      if (userInfo) {
        resData = {
          resCode: status.exist,
          resMsg: "该账号已存在"
        }
        return res.json(resData);
      }
    }
    const data = await Mailcode.find({
      userAccount: userAccount,
    }).sort({ _id: -1 }).limit(1);
    if (!data) {
      resData = {
        resCode: status.error,
        resMsg: "邮箱不正确"
      }
      return res.json(resData);
    }
    if (parseInt(data[0].date - Date.now()) > 0 && data[0].islive && data[0].code == mailCode) {
      // Mailcode.where({_id:data[0]._id}).update({islive:false}).then(function(){
      resData = {
        resCode: status.success,
        resMsg: "验证成功"
      }
      // })
    } else {
      resData = {
        resCode: status.error,
        resMsg: "验证码已过期或不正确"
      }
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData);





  // let { userAccount, mailCode, isForgetPwd } = req.body;
  // User.findOne({
  //   userAccount: userAccount
  // }).then(userInfo => {
  //   if (!isForgetPwd) {
  //     if (userInfo) {
  //       resData = {
  //         resCode: status.exist,
  //         resMsg: "该账号已存在"
  //       }
  //       return res.json(resData);
  //     }
  //   }
  //   Mailcode.find({
  //     userAccount: userAccount,
  //   }).sort({ _id: -1 }).limit(1).then(data => {
  //     if (!data) {
  //       resData = {
  //         resCode: status.error,
  //         resMsg: "邮箱不正确"
  //       }
  //       return res.json(resData);
  //     }
  //     if (parseInt(data[0].date - Date.now()) > 0 && data[0].islive && data[0].code == mailCode) {
  //       // Mailcode.where({_id:data[0]._id}).update({islive:false}).then(function(){
  //       resData = {
  //         resCode: status.success,
  //         resMsg: "验证成功"
  //       }
  //       // })
  //     } else {
  //       resData = {
  //         resCode: status.error,
  //         resMsg: "验证码已过期或不正确"
  //       }
  //     }
  //   })
  // }).catch(err => {
  //   console.log('catched:', err);
  //   resData = {
  //     resCode: status.fail,
  //     resMsg: "出了个bug~~"
  //   }
  // });
  // return res.json(resData);
}