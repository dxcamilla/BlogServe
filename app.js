const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require("mongoose");
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const Cookies = require('cookies');
const bodyParser = require('body-parser');
// const ejs = require('ejs');
const art_express = require('express-art-template');
const User = require('./models/User');
const status = require('./tools/statusCode');
const dbUrl = 'mongodb://localhost:27017/dxBlog';
//引入跨域请求包
const cors = require('cors')
const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.engine('.html',ejs.__express);
app.engine('art', art_express);
app.set('view engine', 'art');
//设置路由端口
app.set('port', process.env.PORT || 8081);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 配置跨域请求
app.use(
  cors({
    "origin": "*", //允许这个域名访问
    "methods": "GET,HEAD,POST", //只接受get和post请求
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  })
)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// express内置函数，代替bodyParser处理post请求体
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
/*
* 连接数据库
* */
mongoose.connect(dbUrl, err => {
  if (err) {
    console.log("connect failed")
  } else {
    console.log("connect success");
  }
})
// app.use((req, res, next) => {
//   req.cookies = new Cookies(req, res);
//   req.userInfo = {};
//   req.userToken = {};
//   if (req.cookies.get('userInfo')) {
//     try {
//       req.userInfo = JSON.parse(req.cookies.get('userInfo'));
//       User.findById(req.userInfo._id).then(userInfo => {
//         req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
//         req.userInfo.superAdmin = Boolean(userInfo.superAdmin);
//       })
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   if (req.cookies.get('userToken')) {
//     try {
//       req.userToken = JSON.parse(req.cookies.get('userToken'));
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   next();
// })
/*
* 根据功能不同划分不同的模块路由
* */

var index = require('./routes');
var users = require('./routes/users');
var admin = require('./routes/admin');
var api = require('./routes/api');

app.use('/', index);
app.use('/api', api);
app.use('/admin', admin);
//api测试
var test = require('./routes/test');
app.use('/test', test);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Font");
  err.status = 404;
  // throw Error(err);
  err.message = err
  next(err);
});

// error handler最后一个中间件不需要next
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  resData = {
    resCode: status.fail,
    resMsg: err.message
  }
  res.json(resData)
});

app.listen(app.get('port'), function () {
  console.log("listening on port " + app.get('port'))
})
module.exports = app;
