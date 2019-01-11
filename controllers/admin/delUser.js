const User = require('../../models/User')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    var { userIds } = req.query;
    console.log(userIds)
    if (!userIds) {
      resData = {
        resCode: status.error,
        resMsg: "传参错误"
      }
      return res.json(resData)
    }
    const data = await User.deleteMany({
      _id: userIds
    })
    resData = {
      resCode: status.success,
      resMsg: "删除成功"
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData)
}