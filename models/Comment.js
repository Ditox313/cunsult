const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const commentSchema = new Schema({


    body: {
        type: String,
        required: true,
    },


    username: {
        type: String,
        required: true,
    },


    parentId: {
        type: String,
        required: false,
    },

    date: {
        type: Date,
        default: Date.now,
    },


    caseId: {
        type: String,
        required: true,
    },


    userId: {
        type: String,
        required: true,
    },


    likes: {
        type: Array,
        required: false,
    },

    disLikes: {
        type: Array,
        required: false,
    },


    // userId: {
    //     ref: 'users', // Аналог внешнего ключа php
    //     type: Schema.Types.ObjectId
    // }
});


// Создаем таблицу Кейсов
module.exports = mongoose.model('comments', commentSchema);