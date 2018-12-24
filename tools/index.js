const jwt = require('jsonwebtoken')
const config = require('../config')
module.exports = {
  verifyToken: token => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.verSecret, (err, decoded) => {
        if (err) {
          console.log('校验token失败')
          reject(err)
        } else {
          console.log('token 验证成功')
          resolve(decoded)
        }
      })
    })
  }
}
