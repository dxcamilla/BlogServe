const Category = require('../../models/Category')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  let { cateId, cateName } = req.query;
  const data = await Category.update({
    _id: cateId
  }, {
      category: cateName
    });
  category.save()
  resData = {
    resCode: status.success,
    resMsg: "修改成功"
  }

  // Category.update({
  //   _id: cateId
  // }, {
  //     category: cateName
  //   }).then(data => {
  //     resData = {
  //       resCode: status.success,
  //       resMsg: "修改成功"
  //     }
  //     category.save()
  //   }).catch(function (err) {
  //     console.log('catched:', err);
  //     resData = {
  //       resCode: status.fail,
  //       resMsg: "修改失败"
  //     }
  //   })
  return res.json(resData);
}
