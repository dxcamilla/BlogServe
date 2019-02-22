const Category = require('../../models/Category')
const Content = require('../../models/Content')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    const { cateId = '' } = req.query;
    const cates = await Category.find();
    let data = ""
    if (!cateId) {
      data = await Content.find().sort({ _id: -1 });
    } else {
      data = await Content.find({
        categoryId: cateId
      }).sort({ _id: -1 });
    }
    resData = {
      resCode: status.success,
      resMsg: "查询成功",
      categories: cates,
      data: data
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData)
}