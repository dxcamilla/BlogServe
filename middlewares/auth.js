const tools = require('../tools')
const CODE = require('../tools/constant')
module.exports = async (req, res, next) => {
  const token = req.headers && req.headers['access-token']
  if (token) {
    try {
      const result = await tools.verifyToken(token)
      res.$user = result
      next()
    } catch (err) {
      res.json({
        resCode: CODE.ERROR,
        resMsg: err
      })
    }
  } else {
    res.status(401).json({
      resCode: CODE.ERROR,
      resMsg: '没有权限'
    })
  }
}