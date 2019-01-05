const Category = require('../../models/Category')
const Content = require('../../models/Content')
// const tools = require('../tools')
// const CODE = require('../tools/constant')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    let datas = [];
    let data = await Content.findOne({
      stick: false
    })
    datas.push(data);
    data = await Content.find().sort({ _id: -1 }).limit(1);
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

  // Content.findOne({
  //   stick: false
  // }).then(data => {
  //   console.log("===========home============")
  //   let datas = [];
  //   datas.push(data)
  //   Content.find().sort({ _id: -1 }).limit(1)
  //     .then(data => {
  //       datas.push(data[0])
  //       resData = {
  //         resCode: status.success,
  //         resMsg: "查询成功",
  //         content: datas
  //       }
  //       // return res.json(resData)
  //     })
  // }).catch(function (err) {
  //   resData = {
  //     resCode: status.fail,
  //     resMsg: "查询失败"
  //   }
  //   console.log('catched:', err);

  // })
  // return res.json(resData)

}