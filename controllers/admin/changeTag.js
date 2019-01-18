const Tag = require('../../models/Tag')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    let { tagId, tagName } = req.query;
    const tags = await Tag.find({
      tag: { '$regex': tagName, '$options': 'i' }
    });
    for (let item of tags) {
      if (item.tag.toLowerCase() === tagName.toLowerCase()) {
        resData = {
          resCode: status.exist,
          resMsg: "该标签已存在"
        }
        return res.json(resData)
      }
    }
    const data = await Tag.update({
      _id: tagId
    }, {
        tag: tagName
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
