const tools = require('../../tools')
const status = require('../statusCode')
module.exports = async (req, res, next) => {
  const token = req.headers && req.headers['access-token']
  // console.log(token);
  console.log(token);
  let $user = '';
  if (token) {
    try {
      const result = await tools.verifyToken(token)
      $user = result
      res.json({
        resCode: status.success,
        resMsg: 'token验证成功',
        userInfo: $user
      })
      // next()
    } catch (err) {
      console.log(err)
      res.json({
        resCode: status.fail,
        resMsg: err
      })
    }
  }
}