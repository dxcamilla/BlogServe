const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const controllers = require('../controllers')
/*
* 发送验证码
*/
router.post("/sendCode", controllers.login.sendCode);
/*
* 注册第一步 || 忘记密码
*/
router.post("/registerFirst", controllers.login.rgstFirst);

/*
* 注册第二步
*/
router.post("/registerNext", controllers.login.rgstSecond);
/*
* 登录
*/
router.post("/login", controllers.login.login)
/*
* token换取用户信息
*/
router.post("/tokenLogin", controllers.login.tokenLogin)
/*
* 登出
*/
router.get("/logout", function (req, res, next) {
    req.cookies.set('userInfo', '');
    res.json(resData);
    return;
})
module.exports = router;