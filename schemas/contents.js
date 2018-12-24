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
    createTime: String,
    publishTime: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: '未发布'
    },
    stick: {
        type: Boolean,
        default: false
    }
})
