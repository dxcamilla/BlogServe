var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    userAccount: String,
    code: String,
    date: Number,
    islive:Boolean
});