const Content = require('../../models/Content')
const status = require('../statusCode')
resData = {
  resCode: status.success,
  resMsg: ""
}
module.exports = (req, res, next) => {
  let page = Number(req.query.page || 1),
    limit = 10,
    skip = (page - 1) * limit;
  Content.find().countDocuments()
    .then(count => {
      let pages = Math.ceil(count / limit);
      page = Math.min(page, pages);
      page = Math.max(page, 1);
      console.log(count);
      Content.find().limit(limit).skip(skip)
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
        })
    }).catch(err => {
      console.log(err)
      resData = {
        resCode: status.fail,
        resMsg: "木有找到哦"
      }
    })

  return res.json(resData);
}