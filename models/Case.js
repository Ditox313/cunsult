const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const moment = require('moment');
// moment.locale('ru');



const caseSchema = new Schema({

    order: {
        type: Number,
        required: true,
    },

    orderViews: {
        type: Number,
        required: false,
        default: 0,
    },

    orderLocal: {
        type: Number,
        required: true,
    },


    title: {
        type: String,
        required: true,
        default: '',
    },


    otraslSpec: {
        type: String,
        required: true,
        default: '',
    },


    functionsNapravlenie: {
        type: String,
        required: true,
        default: '',
    },


    content: {
        type: Object,
        required: true,
        default: '',
    },


    date: {
        type: Date,
        default: Date.now,
    },

    previewSrc: {
        type: String,
        default: '',
        required: false,
    },


    commentsCount: {
        type: Number,
        default: '',
        required: false,
    },


    likes: {
        type: Array,
        required: false,
    },

    disLikes: {
        type: Array,
        required: false,
    },


    

    // Создаем поле с ID юзера
    user: {
        ref: 'users', // Аналог внешнего ключа php
        type: Schema.Types.ObjectId
    }
});


// Создаем таблицу Кейсов
module.exports = mongoose.model('cases', caseSchema);