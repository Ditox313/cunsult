const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const moment = require('moment');
// moment.locale('ru');



const caseSchema = new Schema({

    // order: {
    //     type: Number,
    //     required: true,
    // },


    title: {
        type: String,
        required: true,
        default: '',
    },


    content: {
        type: String,
        required: true,
        default: '',
    },


    date: {
        type: Date,
        default: Date.now,
    },

    imageSrc: {
        type: String,
        default: '',
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