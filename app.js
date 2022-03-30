const express = require('express');
const authRoutes = require('./routes/auth.js');
const bodyParser = require('body-parser');



const app = express();




// Регистрируем модуль bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




// Регистрируем роут auth
app.use('/api/auth', authRoutes);




// Экспортируем наружу
module.exports = app;