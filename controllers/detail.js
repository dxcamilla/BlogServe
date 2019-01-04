const Content = require('../models/Content')
const status = require('../tools/statusCode')
module.exports = (req, res, next) => {
  var { contId } = req.query
  Content.findOne({ _id: contId })
    .then(data => {
      resData = {
        resCode: status.success,
        resMsg: "查询成功",
        content: data
      }
      // res.render('detail.art',{
      //   userInfo: req.userInfo,
      //   content: data
      // })
    }).catch(function (err) {
      console.log('catched:', err);
      resData = {
        resCode: status.fail,
        resMsg: "出了个bug~~"
      }
    })
}