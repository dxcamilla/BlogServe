var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    categoryId: {
        //类型,关联category
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'Category'
    },
    tags: {
        type: Array,
        default: []
    },
    title: String,
    summary: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    creator: String,
    updater: String,
    createTime: String,
    publishTime: {
        type: String,
        default: ''
    },
    updateTime: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: 0 //0:未发布 1:已发布 2：已下架 
    },
    stick: {
        type: Number,
        default: 0
    }
})
