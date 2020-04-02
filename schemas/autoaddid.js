const mongoose = require('mongoose');
const autoIdsSchema = new mongoose.Schema({
    _id: String,
    orderNum: Number
});
autoIdsSchema.statics = {
    autoAddId (id) {
        return new Promise((resolve, reject) => {
            this.findOneAndUpdate(
                { _id: id },
                {
                    $inc: {
                        orderNum: 1
                    }
                }
            ).exec((err, data) => {
                if (err) {
                    reject(err, this);
                } else {
                    resolve(data.orderNum, this);
                }
            })
        })

    }
}
module.exports = autoIdsSchema
