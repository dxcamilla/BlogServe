const Category = require('../../models/Category')
const status = require('../statusCode')
resData = {
  resCode: status.success,
  resMsg: ""
}
module.exports = async (req, res, next) => {
  var cateId = req.query.cateId;
  Category.remove({
    _id: cateId
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