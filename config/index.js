const fs = require('fs')
const privateKey = fs.readFileSync('./config/private.key')
const publicKey  = fs.readFileSync('./config/public.key')
const config = {
  secret: privateKey,
  expires: '7day',
  verSecret: publicKey
}
module.exports = config