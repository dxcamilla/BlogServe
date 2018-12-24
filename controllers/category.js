const Category = require('../models/Category')
const Content = require('../models/Content')
const status = require('./statusCode')
resData = {
  resCode: status.success,
  resMsg: ""
}
module.exports = (req, res) => {
  var { cateId = '' } = req.query;
  console.log("cateId", cateId)
  Category.find().then(cates => {
    if (!cateId) {
      Content.find().then(data => {
        resData = {
          resCode: 1,
          resMsg: "查询成功",
          data: data
        }
      })
    } else {
      Content.find({
        categoryId: cateId
      }).then(data => {
        resData = {
          resCode: 1,
          resMsg: "查询成功",
          data: data
        }
      })
    }
  }).catch(function (err) {
    console.log('catched:', err);
    resData = {
      resCode: status.fail,
      resMsg: "出了个bug~~"
    }
  })
  return res.json(resData)
}