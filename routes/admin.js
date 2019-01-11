const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const User = require('../models/User')
const Category = require('../models/Category')
const Content = require('../models/Content')
const controllers = require('../controllers')
// router.use(function(req, res, next) {
//   if(!req.userInfo.isAdmin){
//     res.send('对不起，只有管理员用户才可以进入后台页面');
//     return;
//   }
//   next();
// })
router.get("/", (req, res, next) => {
  res.render('admin/index.art', {
    userInfo: req.userInfo
  })
})
// 用户管理
router.get('/usersManage', controllers.admin.usersManage)
//删除用户
router.get('/delUser', controllers.admin.delUser)
//修改用户密码和邮箱
router.get('/changeUserInfo', controllers.admin.changeUserInfo)
//超级管理员设置普通管理员
router.get('/setAdmin', controllers.admin.setAdmin)
//标签管理
router.get('/categoriesManage', controllers.admin.categoriesManage)
// 增加分类名称
router.get('/addCategory', controllers.admin.addCategory)
// 修改分类名称
router.get('/changeCategory', controllers.admin.changeCategory)
// 删除分类
router.get('/delCategory', controllers.admin.delCategory)
/**
 * 内容管理页面
 *  */
// 内容管理页面
router.get('/contentsManage', controllers.admin.contentsManage)
// 跳转至新增、修改内容
router.get('/toAddContent', controllers.admin.toAddContent)
//添加内容
router.get('/addContent', controllers.admin.addContent)
router.get('/delContent', controllers.admin.delContent)
router.get('/toEditContent', controllers.admin.toEditContent)
router.get('/saveEditContent', controllers.admin.saveEditContent)
module.exports = router;
