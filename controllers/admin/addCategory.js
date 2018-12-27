const Category = require('../../models/Category')
const status = require('../statusCode')
module.exports = (req, res, next) => {
  var { cateName } = req.query;
  console.log(req.query)
  console.log(cateName)
  console.log(typeof cateName)
  Category.findOne({
    category: { '$regex': cateName, '$options': 'i' }
  }).then(function (isExist) {
    if (isExist) {
      resData = {
        resCode: status.exist,
        resMsg: "该分类已存在"
      }
      return res.json(resData)
    }
    var category = new Category({
      category: cateName
    })
    resData = {
      resCode: status.success,
      resMsg: "添加成功"
    }
    category.save();
  }).catch(function (err) {
    resData = {
      resCode: status.fail,
      resMsg: "保存失败"
    }
    console.log('catched:', err);
  })
  return res.json(resData)
}