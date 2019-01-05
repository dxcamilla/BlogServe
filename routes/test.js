var express = require('express')
const jwt = require('jsonwebtoken')
var router = express.Router()
const User = require('../models/User')
const jwtConf = require('../config')
const controllers = require('../controllers')
let resData;
router.use((req, res, next) => {
  resData = {
    resCode: 1,
    resMsg: ""
  }
  next();
});
router.get('/', function (req, res, next) {
  res.render('test.art', {
    data: req.userInfo,
    data2: req.userToken
  })
})
// http://localhost:8081/test/user/login?userAccount=111@qq.com&pwd=111111
router.get('/user/login', function (req, res, next) {
  let { userAccount, pwd } = req.query
  console.log(userAccount, pwd)
  User.findOne({
    userAccount: userAccount,
    password: pwd
  }).then(userInfo => {
    if (userInfo) {
      const userpayload = {
        _id: userInfo._id,
        userAccount: userInfo.userAccount,
        userName: userInfo.userName,
        isAdmin: userInfo.isAdmin,
        superAdmin: userInfo.superAdmin
      }
      resData.resCode = 1;
      resData.resMsg = "登录成功";
      resData.userToken = jwt.sign(userpayload, jwtConf.secret, { algorithm: 'RS256', expiresIn: jwtConf.expires });
      // jwt.verify(resData.userToken,jwtConf.verSecret,(err,decoded)=>{
      //   if(err){
      //     console.log(err.message)
      //     return
      //   }
      //   console.log(decoded)
      //   res.render('test.art', {
      //     data:'登录成功'
      //   })
      //   return;
      // })
      req.cookies.set('userToken', JSON.stringify({
        token: resData.userToken
      }))
      res.json(resData);

      res.render('test.art', {
        data: resData
      })

      return;
    } else {
      resData.resCode = 7;
      resData.resMsg = "账号或密码错误";
      res.json(resData);
      res.render('test.art', {
        data: resData
      })
      return;
    }
  }).catch(function (err) {
    console.log('catched:', err);
  })
})
// http://localhost:8081/test//user/verUserInfo
router.get('/user/verUserInfo', function (req, res, next) {
  let token = req.userToken.token;
  console.log(token)
  jwt.verify(token, jwtConf.verSecret, (err, decoded) => {
    if (err) {
      console.log(err.message)
      return
    }
    console.log(decoded)
    // res.render('test.art', {
    //   data: decoded
    // })
    return;
  })
})
// 分类查询
// http://localhost:8081/test/category
router.get('/category', controllers.api.category)
module.exports = router;