const Category = require('../../models/Category')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    var { cateIds } = req.query;
    const data = await Category.deleteMany({
      _id: cateIds
    })
    resData = {
      resCode: status.success,
      resMsg: "删除成功"
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData)
  // Category.deleteMany({
  //   _id: cateIds
  // }).then(data => {
  //   resData = {
  //     resCode: status.success,
  //     resMsg: "删除成功"
  //   }
  // }).catch(err => {
  //   console.log('catched:', err);
  //   resData = {
  //     resCode: status.fail,
  //     resMsg: "删除失败"
  //   }
  // })
  // return res.json(resData)
}