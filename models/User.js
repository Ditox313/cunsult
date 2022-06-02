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


    //Создаем поле для программы
    program: {
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


    // Поле даты
    date: {
        type: Date,
        default: Date.now,
    },


    //Создаем поле для города
    city: {
        type: String,
        required: false,
        default: '',
    },

    //Создаем поле для названия компании
    company: {
        type: String,
        required: false,
        default: '',
    },

    //Создаем поле для отрасли профессиональной специализации
    otraslSpec: {
        type: String,
        required: false,
        default: '',
    },

    //Создаем поле для функционального направления
    functionsNapravlenie: {
        type: String,
        required: false,
        default: '',
    },


    //Создаем поле для опыта работы
    opyt: {
        type: String,
        required: false,
        default: '',
    },


    //Создаем поле для образования
    education: {
        type: String,
        required: false,
        default: '',
    },


    //Создаем поле для знаний и навыков
    skills: {
        type: String,
        required: false,
        default: '',
    },


    //Создаем поле для языков
    languages: {
        type: String,
        required: false,
        default: '',
    },

    //Создаем поле для дополнительной информации
    dopInfo: {
        type: String,
        required: false,
        default: '',
    },


    //Создаем поле для семейного положения
    family: {
        type: String,
        required: false,
        default: '',
    },


    //Создаем поле для увлечений
    hobby: {
        type: String,
        required: false,
        default: '',
    },


    //Создаем поле для публикаций и статей
    publication: {
        type: String,
        required: false,
        default: '',
    },

    //Создаем поле для компитенций в бизнесе
    compitations: {
        type: String,
        required: false,
        default: '',
    },


    //Создаем поле для соцсетей
    socials: {
        type: String,
        required: false,
        default: '',
    },


    //Создаем поле для соцсетей
    casesCount: {
        type: String,
        required: false,
        default: '',
    },





});


// Создаем таблицу users
module.exports = mongoose.model('users', userSchema);