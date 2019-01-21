// const Category = require('../../models/Category')
// const Tag = require('../../models/Tag')
// const status = require('../../tools/statusCode')
// module.exports = async (req, res, next) => {
//   try {
//     const cates = await Category.find();
//     const tags = await Tag.find();
//     resData = {
//       resCode: status.success,
//       resMsg: "获取成功",
//       categories: cates,
//       tags: tags
//     }
//   } catch (err) {
//     next(err);
//   }
//   return res.json(resData);
// }