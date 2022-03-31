const express = require('express');
const authRoutes = require('./routes/auth.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');



const app = express();




// Подключаемся к MongoDB
mongoose.connect(keys.mongoUri)
    .then(function() {
        console.log('Мы подключились к БД приложения!!!');
    })
    .catch(function(error) {
        console.log(error);
    });





// Регистрируем Morgan 
app.use(morgan('dev'));



// Регистрируем модуль bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Регистрируем роут auth
app.use('/api/auth', authRoutes);



// Регистрируем Cors
app.use(cors());


// Экспортируем наружу
module.exports = app;