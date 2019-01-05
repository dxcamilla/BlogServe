var express = require('express')
var router = express.Router()
const controllers = require('../controllers')
/* GET home page. */

router.get('/', controllers.api.home)
router.get("/detail", controllers.api.detail)
router.get("/category", controllers.api.category)
module.exports = router;
