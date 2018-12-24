var mongoose = require('mongoose');
var mailSchema = require('../schemas/mailCodes');

module.exports = mongoose.model('Mailcode',mailSchema);
