const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.js');




// Регистрируем роут auth
app.use('/api/auth', authRoutes);




// Экспортируем наружу
module.exports = app;