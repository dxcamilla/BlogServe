const Content = require('../../models/Content')
const status = require('../statusCode')
resData = {
  resCode: status.success,
  resMsg: ""
}
module.exports = (req, res, next) => {
  var { contIds } = req.query;
  Content.deleteMany({
    _id: contIds
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