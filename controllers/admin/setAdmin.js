const User = require('../../models/User')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    var { userId, adminPermission } = req.query
    console.log(userId)
    const data = await User.update({
      _id: userId
    }, {
        isAdmin: adminPermission,
      });
    resData = {
      resCode: status.success,
      resMsg: "设置成功",
      content: data
    }
    res.json(resData)
  } catch (err) {
    next(err)
  }
  return res.json(resData)
}