const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы users

const userSchema = new Schema({
    // Создаем поле с email юзера
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Создаем поле паролем юзера
    password: {
        type: String,
        required: true,
    },

    //Создаем поле для телефона
    phone: {
        type: String,
        required: false,
    },

    //Создаем поле для имени
    name: {
        type: String,
        required: true,
    },

    //Создаем поле для фамилии
    secondName: {
        type: String,
        required: true,
    },


    //Создаем поле для отчества
    thirdName: {
        type: String,
        required: false,
    },


    //Создаем поле для номера группы МВА
    groupName: {
        type: String,
        required: false,
    },


    //Создаем поле для специализации
    specialization: {
        type: String,
        required: false,
    },

    //Создаем поле для сдолжности
    workPos: {
        type: String,
        required: false,
    },


    //Создаем поле для года выпуска
    year: {
        type: Number,
        required: true,
    },


    // Создаем поле изображения юзера
    xsAvatar: {
        type: String,
        default: '',
        required: false,
    },

});


// Создаем таблицу users
module.exports = mongoose.model('users', userSchema);