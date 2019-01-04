const Category = require('../../models/Category')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  Category.find().then(data => {
    resData = {
      resCode: status.success,
      resMsg: "获取成功",
      categories: data
    }
    // res.render('admin/editContent.art', {
    //   userInfo: req.userInfo,
    //   categories: data
    // })
  }).catch(err => {
    console.log('catched:', err);
    resData = {
      resCode: status.fail,
      resMsg: "获取失败"
    }
  })
  return res.json(resData)
}