const Content = require('../../models/Content')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    var { contIds } = req.query;
    const data = await Content.deleteMany({
      _id: contIds
    })
    resData = {
      resCode: status.success,
      resMsg: "删除成功"
    }
  } catch (err) {
    next(err)
  }
  return res.json(resData);

  // Content.deleteMany({
  //   _id: contIds
  // }).then(data => {
  //   resData = {
  //     resCode: status.success,
  //     resMsg: "删除成功"
  //   }
  // }).catch(err => {
  //   console.log('catched:', err);
  //   resData = {
  //     resCode: status.fail,
  //     resMsg: "删除成功"
  //   }
  // })

}