const Content = require('../../models/Content')
const status = require('../statusCode')
resData = {
  resCode: status.success,
  resMsg: ""
}
module.exports = (req, res, next) => {
  var { contId, contType, contTitle, contSummary, contBody } = req.query;
  Content.update({
    _id: contId
  }, {
      categoryId: contType,
      title: contTitle,
      summary: contSummary,
      content: contBody
    }).then(data => {
      resData = {
        resCode: status.success,
        resMsg: "修改成功"
      }
      category.save();
    }).catch(err => {
      console.log('catched:', err);
      resData = {
        resCode: status.fail,
        resMsg: "修改失败"
      }
    })
  return res.json(resData);
}