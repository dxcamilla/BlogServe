const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const controllers = require('../controllers')
let resData;
router.use((req, res, next) => {
    resData = {
        resCode: 1,
        resMsg: ""
    }
    next();
});
/*
* 发送验证码
*/
router.post("/user/sendCode", controllers.login.sendCode);
/*
* 注册第一步 || 忘记密码
*/
router.post("/user/registerFirst", controllers.login.rgstFirst);

/*
* 注册第二步
*/
router.post("/user/registerNext", controllers.login.rgstSecond);
/*
* 登录
*/
router.post("/user/login", controllers.login.index)

/*
* 登出
*/
router.get("/user/logout", function (req, res, next) {
    req.cookies.set('userInfo', '');
    res.json(resData);
    return;
})
module.exports = router;