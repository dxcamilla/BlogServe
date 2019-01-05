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
    Content.find().limit(limit).skip(skip)
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
            data: data
          }
        }
        return res.json(resData);
      })
  } catch (err) {
    next(err)
  }




  // Content.find().countDocuments()
  //   .then(count => {
  //     console.log("===========ContentManage===========")
  //     let pages = Math.ceil(count / limit);
  //     page = Math.min(page, pages);
  //     page = Math.max(page, 1);
  //     console.log(count);
  //     Content.find().limit(limit).skip(skip)
  //       .populate({ path: 'categoryId', select: { category: 1 } })   //上述结果集合中的dep字段用departments表中的name字段填充
  //       .exec((err, data) => {
  //         if (err) {
  //           console.log(err)
  //           resData = {
  //             resCode: status.fail,
  //             resMsg: "木有找到哦"
  //           }
  //         } else {
  //           resData = {
  //             resCode: status.success,
  //             resMsg: "查询成功",
  //             data: data
  //           }
  //         }
  //       })
  //   }).catch(err => {
  //     console.log(err)
  //     resData = {
  //       resCode: status.fail,
  //       resMsg: "木有找到哦"
  //     }
  //   })
  // return res.json(resData);
}