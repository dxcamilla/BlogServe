const mongoose = require('mongoose');
const autoOrderSchema = require('../schemas/autoaddid');
const AuotId = mongoose.model('AuotId', autoOrderSchema);
function addFirstId (idName, baseNum) {
  AuotId.findOne({
    _id: idName
  }).exec((err, data) => {
    if (err) {
      console.log("err:", err);
      return;
    }
    if (!data) {
      var firstId = new AuotId({
        _id: idName,
        orderNum: baseNum
      })
      firstId.save((err, data) => {
        console.log(data);
      });
    }
  })
}
addFirstId('contentid', 100000);
addFirstId('commentid', 1000000);
module.exports = AuotId;
