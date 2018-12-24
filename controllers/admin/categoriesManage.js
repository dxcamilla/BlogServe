const Category = require('../../models/Category')
const status = require('../statusCode')
resData = {
  resCode: status.success,
  resMsg: ""
}
module.exports = async (req, res, next) => {
  Category.find().then(data => {
    resData = {
      resCode: status.success,
      resMsg: "查询成功",
      categories: data
    }
  }).catch(err => {
    console.log('catched:', err);
    resData = {
      resCode: status.noresult,
      resMsg: "没查到呀"
    }
  })
  return res.json(resData)
}