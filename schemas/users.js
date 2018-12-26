var mongoose = require("mongoose");
module.exports = new mongoose.Schema({
    userAccount: String,
    isAdmin: {
        type: Number,
        default: 0 //0：普通用户，1：管理员，2.超级管理员
    },
    userName: String,
    password: String
});