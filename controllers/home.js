const Category = require('../models/Category')
const Content = require('../models/Content')
// const tools = require('../tools')
// const CODE = require('../tools/constant')
const status = require('./statusCode')
module.exports = (req, res, next) => {
  // const token = req.headers && req.headers['access-token']
  // // console.log(token);
  // console.log(token);
  // let $user = '';
  // if (token) {
  //   try {
  //     const result = tools.verifyToken(token)
  //     $user = result
  //     // next()
  //   } catch (err) {
  //     console.log(err)
  //     res.json({
  //       resCode: CODE.ERROR,
  //       resMsg: err
  //     })
  //   }
  // }
  Content.findOne({
    stick: false
  }).then(data => {
    let datas = [];
    datas.push(data)
    Content.find().sort({ _id: -1 }).limit(1)
      .then(data => {
        datas.push(data[0])
        resData = {
          resCode: status.success,
          resMsg: "查询成功",
          content: datas
        }
      })
  }).catch(function (err) {
    resData = {
      resCode: status.fail,
      resMsg: "查询失败"
    }
    console.log('catched:', err);
  })
  return res.json(resData)
}