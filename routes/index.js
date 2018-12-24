var express = require('express')
var router = express.Router()
const controllers = require('../controllers')
/* GET home page. */
router.get('/', controllers.home)
router.get("/detail", controllers.detail)
router.get("/category", controllers.category)
module.exports = router;
