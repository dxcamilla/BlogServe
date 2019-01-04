const Category = require('../../models/Category')
const Content = require('../../models/Content')
const status = require('../../tools/statusCode')
module.exports = (req, res, next) => {
  var { contId } = req.query
  Category.find().then(cates => {
    Content.findOne({
      _id: contId
    }).then(data => {
      resData = {
        resCode: status.success,
        resMsg: "查询成功",
        content: data,
        categories: cates
      }
      // res.render('admin/editContent.art', {
      //   userInfo: req.userInfo,
      //   content: data,
      //   categories: cates
      // })
    }).catch(err => {
      console.log('catched:', err);
      resData = {
        resCode: status.fail,
        resMsg: "获取失败"
      }
    })
  })
  return res.json(resCode)
}