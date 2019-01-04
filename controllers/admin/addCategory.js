const Category = require('../../models/Category')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {

  var { cateName } = req.query;
  // if (cateName === '' || cateName === null) {
  //   resData = {
  //     resCode: status.error,
  //     resMsg: "分类不能为空"
  //   }
  //   return res.json(resData)
  // }
  const cates = await Category.findOne({
    category: { '$regex': cateName, '$options': 'i' }
  })
  if (cates) {
    resData = {
      resCode: status.exist,
      resMsg: "该分类已存在"
    }
    return res.json(resData)
  }
  const category = new Category({
    category: cateName
  })
  category.save();
  resData = {
    resCode: status.success,
    resMsg: "添加成功"
  }
  return res.json(resData)

  // Category.findOne({
  //   category: { '$regex': cateName, '$options': 'i' }
  // }).then(function (cates) {
  //   if (cates) {
  //     resData = {
  //       resCode: status.exist,
  //       resMsg: "该分类已存在"
  //     }
  //     return res.json(resData)
  //   }
  //   var category = new Category({
  //     category: cateName
  //   })
  //   resData = {
  //     resCode: status.success,
  //     resMsg: "添加成功"
  //   }
  //   category.save();
  // }).catch(function (err) {
  //   resData = {
  //     resCode: status.fail,
  //     resMsg: "保存失败"
  //   }
  //   console.log('catched:', err);
  // })
  // return res.json(resData)
}