const Tag = require('../../models/Tag')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {

    let page = Number(req.query.page || 1),//当前页数
      limit = 10,//每页展示条数
      skip = (page - 1) * limit;//去除的条数
    const count = await Tag.find().countDocuments();
    const pages = Math.ceil(count / limit);
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    const data = await Tag.find().limit(limit).skip(skip);
    resData = {
      resCode: status.success,
      resMsg: "查询成功",
      tags: data,
      page: page,
      pages: new Array(pages),
      limit: limit,
      total: count
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData);
}