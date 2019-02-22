const Category = require('../../models/Category')
const Content = require('../../models/Content')
// const tools = require('../tools')
// const CODE = require('../tools/constant')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    // {
    //   stick: { $ne: 0 }
    // }
    let datas = [];
    let data = await Content.find().sort({
      stick: 1
    }).sort({
      _id: -1
    }).limit(1);
    datas.push(data[0]);
    const stickId = data[0]._id
    data = await Content.find({
      _id: { $ne: stickId }
    }).sort({ _id: -1 }).limit(1);
    datas.push(data[0])
    resData = {
      resCode: status.success,
      resMsg: "查询成功",
      content: datas
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData)
}