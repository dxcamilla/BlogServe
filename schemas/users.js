var mongoose = require("mongoose");
module.exports = new mongoose.Schema({
    userAccount: String,
    isAdmin:{
        type:Boolean,
        default:false
    },
    superAdmin:{
        type:Boolean,
        default:false
    },
    userName: String,
    password: String
})
