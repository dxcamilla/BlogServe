const User = require('../../models/User')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    var { userId } = req.query;
    const data = await User.deleteMany({
      _id: userId
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