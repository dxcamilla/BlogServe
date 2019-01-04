const User = require('../../models/User')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  let page = Number(req.query.page || 1),//当前页数
    limit = 2,//每页展示条数
    skip = (page - 1) * limit;//去除的条数
  User.find().countDocuments().then(count => {
    let pages = Math.ceil(count / limit);
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    User.find().limit(limit).skip(skip).then(users => {
      resData = {
        resCode: status.success,
        resMsg: "查询成功",
        users: users,
        page: page,
        pages: new Array(pages),
        limit: limit
      }
      // res.render('admin/userManage.art', {
      //   userInfo: req.userInfo,
      //   users: users,
      //   page: page,
      //   pages: new Array(pages),
      //   limit: limit
      // })
    }).catch(err => {
      console.log('catched:', err);
      resData = {
        resCode: status.fail,
        resMsg: "查询失败"
      }
    })
  })
  return res.json(resData)

}