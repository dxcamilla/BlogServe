const Content = require('../../models/Content')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    const { contId } = req.query;
    console.log(contId);
    const data = await Content.findOne({ _id: contId })
      .populate({ path: 'categoryId', select: { category: 1 } });
    resData = {
      resCode: status.success,
      resMsg: "查询成功",
      content: data
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData);
}