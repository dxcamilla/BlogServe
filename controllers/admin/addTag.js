const Tag = require('../../models/Tag')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    const { tagName = '' } = req.query;
    if (tagName === '' || tagName === null) {
      resData = {
        resCode: status.error,
        resMsg: "标签不能为空"
      }
      return res.json(resData)
    }
    const tags = await Tag.find({
      tag: { '$regex': tagName, '$options': 'i' }
    })
    for (let item of tags) {
      if (item.tag.toLowerCase() === tagName.toLowerCase()) {
        resData = {
          resCode: status.exist,
          resMsg: "该标签已存在"
        }
        return res.json(resData)
      }
    }
    const tag = new Tag({
      tag: tagName
    })
    tag.save();
    resData = {
      resCode: status.success,
      resMsg: "添加成功"
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData)
}