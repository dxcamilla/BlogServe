const Tag = require('../../models/Tag')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    var { tagIds } = req.query;
    const data = await Tag.deleteMany({
      _id: tagIds
    })
    resData = {
      resCode: status.success,
      resMsg: "删除成功"
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData);
}