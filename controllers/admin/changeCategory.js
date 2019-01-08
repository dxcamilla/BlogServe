const Category = require('../../models/Category')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    let { cateId, cateName } = req.query;
    const cates = await Category.find({
      category: { '$regex': cateName, '$options': 'i' }
    });
    for (let item of cates) {
      if (item.category.toLowerCase() === cateName.toLowerCase()) {
        resData = {
          resCode: status.exist,
          resMsg: "该分类已存在"
        }
        return res.json(resData)
      }
    }
    const data = await Category.update({
      _id: cateId
    }, {
        category: cateName
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
