const Comment = require('../../models/Comment')
const User = require('../../models/User')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    const { contId, commentBody, userId, commentType } = req.query;
    var dateTime = (new Date()).Format('yyyy-MM-dd hh:mm:ss');
    resData = {
      resCode: status.success,
      resMsg: "评论成功"
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData);
}