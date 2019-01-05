const Category = require('../../models/Category')
const Content = require('../../models/Content')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    const { cateId = '' } = req.query;
    const cates = await Category.find();
    if (!cateId) {
      const data = await Content.find();
      resData = {
        resCode: status.success,
        resMsg: "查询成功",
        data: data
      }
    } else {
      const data = await Content.find({
        categoryId: cateId
      });
      resData = {
        resCode: status.success,
        resMsg: "查询成功",
        data: data
      }
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData)


  // var { cateId = '' } = req.query;
  // console.log("cateId", cateId)
  // Category.find().then(cates => {
  //   if (!cateId) {
  //     Content.find().then(data => {
  //       resData = {
  //         resCode: 1,
  //         resMsg: "查询成功",
  //         data: data
  //       }
  //     })
  //   } else {
  //     Content.find({
  //       categoryId: cateId
  //     }).then(data => {
  //       resData = {
  //         resCode: 1,
  //         resMsg: "查询成功",
  //         data: data
  //       }
  //     })
  //   }
  // }).catch(function (err) {
  //   console.log('catched:', err);
  //   resData = {
  //     resCode: status.fail,
  //     resMsg: "出了个bug~~"
  //   }
  // })
  // return res.json(resData)
}