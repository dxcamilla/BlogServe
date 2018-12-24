const Content = require('../../models/Content')
const status = require('../statusCode')
resData = {
  resCode: status.success,
  resMsg: ""
}
module.exports = (req, res) => {
  var contId = req.query.contId
  Content.findOne({ _id: contId })
    .then(data => {
      res.render('detail.art', {
        userInfo: req.userInfo,
        content: data
      })
    }).catch(function (err) {
      console.log('catched:', err);
      resData = {
        resCode: status.fail,
        resMsg: "出了个bug~~"
      }
    })
  return res.json(resData)
}