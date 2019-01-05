const User = require('../../models/User')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    var { userId } = req.query
    const data = await User.Update({
      _id: userId
    }, {
        isAdmin: 1,
      });
    resData = {
      resCode: status.success,
      resMsg: "设置成功",
      content: data
    }
    res.json(resData)
  } catch (err) {
    next(err)
  }
  return res.json(resData)
  // var contId = req.query.contId
  // Content.findOne({ _id: contId })
  //   .then(data => {
  //     res.render('detail.art', {
  //       userInfo: req.userInfo,
  //       content: data
  //     })
  //   }).catch(function (err) {
  //     console.log('catched:', err);
  //     resData = {
  //       resCode: status.fail,
  //       resMsg: "出了个bug~~"
  //     }
  //   })
  // return res.json(resData)
}