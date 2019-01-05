const Category = require('../../models/Category')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    console.log('==================== categories =======================')
    const data = await Category.find();
    resData = {
      resCode: status.success,
      resMsg: "查询成功",
      categories: data
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData);

  // Category.find().then(data => {
  //   console.log('categories:', data)
  //   resData = {
  //     resCode: status.success,
  //     resMsg: "查询成功",
  //     categories: data
  //   }
  // }).catch(err => {
  //   console.log('catched:', err);
  //   resData = {
  //     resCode: status.noresult,
  //     resMsg: "没查到呀"
  //   }
  // })

}