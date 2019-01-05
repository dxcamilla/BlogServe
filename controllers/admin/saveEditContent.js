const Content = require('../../models/Content')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    var { contId, contType, contTitle, contSummary, contBody } = req.query;
    const data = await Content.update({
      _id: contId
    }, {
        categoryId: contType,
        title: contTitle,
        summary: contSummary,
        content: contBody
      })
    console.log(data)
    resData = {
      resCode: status.success,
      resMsg: "修改成功"
    }
    category.save();
  } catch (err) {
    next(err)
  }
  return res.json(resData);
}