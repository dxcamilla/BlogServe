const Category = require('../../models/Category')
const Tag = require('../../models/Tag')
const Content = require('../../models/Content')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    var { contId } = req.query
    const cates = await Category.find();
    const tags = await Tag.find();
    let data = await Content.findOne({ _id: contId });
    resData = {
      resCode: status.success,
      resMsg: "查询成功",
      content: data,
      categories: cates,
      tags: tags
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData);
}