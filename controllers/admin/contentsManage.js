const Content = require('../../models/Content')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    let page = Number(req.query.page || 1),
      limit = 10,
      skip = (page - 1) * limit;
    const count = await Content.find().countDocuments();
    let pages = Math.ceil(count / limit);
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    Content.find().sort({ _id: -1 }).limit(limit).skip(skip)
      .populate({ path: 'categoryId', select: { category: 1 } })
      .exec((err, data) => {
        if (err) {
          console.log(err)
          resData = {
            resCode: status.fail,
            resMsg: "木有找到哦"
          }
        } else {
          resData = {
            resCode: status.success,
            resMsg: "查询成功",
            data: data,
            page: page,
            pages: new Array(pages),
            limit: limit,
            total: count
          }
        }
        return res.json(resData);
      })
  } catch (err) {
    next(err)
  }
}