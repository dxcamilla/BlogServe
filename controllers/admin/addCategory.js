const Category = require('../../models/Category')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    const { cateName = '' } = req.query;
    if (cateName === '' || cateName === null) {
      resData = {
        resCode: status.error,
        resMsg: "分类不能为空"
      }
      return res.json(resData)
    }
    const cates = await Category.find({
      category: { '$regex': cateName, '$options': 'i' }
    })
    for (let item of cates) {
      if (item.category.toLowerCase() === cateName.toLowerCase()) {
        resData = {
          resCode: status.exist,
          resMsg: "该分类已存在"
        }
        return res.json(resData)
      }
    }
    const category = new Category({
      category: cateName
    })
    category.save();
    resData = {
      resCode: status.success,
      resMsg: "添加成功"
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData)
}