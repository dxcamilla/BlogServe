const User = require('../../models/User')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    let { userId, account, nick, pwd } = req.query;
    console.log(req.query);
    // const users = await User.find({
    //   userAccount: { '$regex': account, '$options': 'i' }
    // });
    // if (users.length > 1) {
    //   resData = {
    //     resCode: status.exist,
    //     resMsg: "改用户名已经注册了"
    //   }
    //   return res.json(resData);
    // }
    const data = await User.update({
      // let { userId, account, nick, pwd } = req.query;
      _id: userId
    }, {
        userAccount: account,
        userName: nick,
        password: pwd
      });
    resData = {
      resCode: status.success,
      resMsg: "修改成功"
    }
  } catch (err) {
    next(err)
  }
  return res.json(resData);
}
