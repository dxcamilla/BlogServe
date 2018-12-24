const Content = require('../../models/Content')
const status = require('../statusCode')
resData = {
  resCode: status.success,
  resMsg: ""
}
module.exports = async (req, res, next) => {
  Content.find()
    .populate({ path: 'categoryId', select: { category: 1 } })   //上述结果集合中的dep字段用departments表中的name字段填充
    .exec((err, data) => {
      if (err) {
        console.log(err)
        resData = {
          resCode: status.fail,
          resMsg: "木有找到哦"
        }
      } else {
        resData = {
          resCode: status.success,
          resMsg: "查询成功",
          data: data
        }
      }
    }).catch(err => {
      console.log(err)
      resData = {
        resCode: status.fail,
        resMsg: "木有找到哦"
      }
    })
  return res.json(resData);
}