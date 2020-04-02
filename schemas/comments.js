var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    _id: {
        type: Number,
        default: 100000
    },
    dialogId: Number,
    contentId: {
        //类型,关联稿件
        type: Number,
        // 引用
        ref: 'Content'
    },
    comment: [{
        userId: {
            //类型,关联User
            type: mongoose.Schema.Types.ObjectId,
            // 引用
            ref: 'User'
        },
        body: String,
        createTime: {
            type: String,
            default: '1992-03-29 00:00'
        },
        replyLists: [{
            userId: {
                //类型,关联User
                type: mongoose.Schema.Types.ObjectId,
                // 引用
                ref: 'User'
            },
            asoUser: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            body: String,
            replyTime: String,
        }],
        replyOther: [{
            asoUser: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            body: String,
            replyTime: String
        }]
    }],

})
