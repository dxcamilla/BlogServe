## JWT原理和使用
### 原理
1. 因为传统的用cookie存储用户信息不安全且存在跨域问题，token是一串加了密的字符串。用来校验用户信息。
2. 大概流程如下：
   1. 用户使用用户名&密码登录系统
   2. 服务器校验通过后，生成一串token字符串传递给C端
   3. C端存储token，每次请求时带上token，一般放在请求头里
   4. 服务端校验token，通过后返回数据

### express如何使用jwt
1. 首先安装jsonwebtoken包 yarn add jsonwebtoken
2. 选择加密算法。我们用的非对称加密（egRS256和ES256）可以通过openssl来生成，具体的百度

## mongoDB 连接&启动&使用
### 数据库启动
1. 参考菜鸟教程按照mongodb
2. 
```
// 启动时未找到mongod命令可能是 ~/.bash_profile中没找到环境变量的设置
// 设置,进入文件
vim ~/.bash_profile 
加入命令行
export PATH=/usr/local/mongodb/bin:$PATH
保存 重新运行文件 source ~/.bash_profile 
```
### mongoose -- nodejs操作mongoDB
1.mongoose是mongoDB的一个对象模型工具，是基于node-mongodb-native开发的mongoDB的nodejs驱动，可以在异步的环境下执行。同时它也是针对mongoDB操作的一个对象模型库，封装了mongoDB对文档的一些增删改查等常用方法，让nodejs操作mongoDB数据库变得更加容易。
1. 需要安装mongoose	===> npm install mongoose
2. 连接数据库
   (```)
   // 在app.js写入
   const mongoose = require("mongoose");
   // dbUrl是启动后数据库的地址
   mongoose.connect(dbUrl, err => {
      if (err) {
         console.log("db connect failed =====")
      } else {
         console.log("db connect success =====");
      }
   })
   (```)



一、创建数据库连接：（安装引用mongoose模型工具）
	1. 在schema中定义表结构，schemas/users.js对应用户信息表结构
	2. 在models中进行增删改查，在应用中直接操作模型类的来进行数据库的增删改查工作
	3. api中处理前端发送来的请求