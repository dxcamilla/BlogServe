const Content = require('../../models/Content')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    const { contId } = req.query
    const data = await Content.findOne({ _id: contId });
    resData = {
      resCode: status.success,
      resMsg: "查询成功",
      content: data
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData);
  // var { contId } = req.query
  // Content.findOne({ _id: contId })
  //   .then(data => {
  //     resData = {
  //       resCode: status.success,
  //       resMsg: "查询成功",
  //       content: data
  //     }
  //     // res.render('detail.art',{
  //     //   userInfo: req.userInfo,
  //     //   content: data
  //     // })
  //   }).catch(function (err) {
  //     console.log('catched:', err);
  //     resData = {
  //       resCode: status.fail,
  //       resMsg: "出了个bug~~"
  //     }
  //   })
}