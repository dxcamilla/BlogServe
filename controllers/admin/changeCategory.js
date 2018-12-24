const Category = require('../../models/Category')
const status = require('../statusCode')
resData = {
  resCode: status.success,
  resMsg: ""
}
module.exports = async (req, res, next) => {
  let { cateId, cateName } = req.query;
  Category.update({
    _id: cateId
  }, {
      category: cateName
    }).then(data => {
      resData = {
        resCode: status.success,
        resMsg: "修改成功"
      }
      category.save()
    }).catch(function (err) {
      console.log('catched:', err);
      resData = {
        resCode: status.fail,
        resMsg: "修改失败"
      }
    })
  return res.json(resData);
}
