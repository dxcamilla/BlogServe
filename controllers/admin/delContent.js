const Content = require('../../models/Content')
const status = require('../statusCode')
resData = {
  resCode: status.success,
  resMsg: ""
}
module.exports = (req, res, next) => {
  var { contId } = req.query;
  Content.remove({
    _id: contId
  }).then(data => {
    resData = {
      resCode: status.success,
      resMsg: "删除成功"
    }
  }).catch(err => {
    console.log('catched:', err);
    resData = {
      resCode: status.fail,
      resMsg: "删除成功"
    }
  })
  return res.json(resData);
}