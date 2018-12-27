const Category = require('../../models/Category')
const status = require('../statusCode')
resData = {
  resCode: status.success,
  resMsg: ""
}
module.exports = (req, res, next) => {
  var { cateIds } = req.query;
  Category.deleteMany({
    _id: cateIds
  }).then(data => {
    resData = {
      resCode: status.success,
      resMsg: "删除成功"
    }
  }).catch(err => {
    console.log('catched:', err);
    resData = {
      resCode: status.fail,
      resMsg: "删除失败"
    }
  })
  return res.json(resData)
}