const Category = require('../../models/Category')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
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
}