const express = require('express');
const authRoutes = require('./routes/auth.js');
const caseRoutes = require('./routes/case.js');
const searchRoutes = require('./routes/search.js');
const commentRoutes = require('./routes/comment.js');
const likesRoutes = require('./routes/likes.js');
const likesCommentRoutes = require('./routes/likes-comment.js');
const additionalLikeCommentRoutes = require('./routes/additional-like-comment.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const passport = require('passport');
// Что бы работали пути при деплое
const path = require('path');




const app = express();


// Регистрируем Cors
app.use(cors());



// Подключаемся к MongoDB
mongoose.connect(keys.mongoUri)
    .then(function() {
        console.log('Мы подключились к БД приложения!!!');
    })
    .catch(function(error) {
        console.log(error);
    });


// Инициализируем passport и подключаем файл обработчик для логики защиты и проверки роутов
app.use(passport.initialize());
require('./middleware/passport')(passport);



// Добавляем возможность отдавать с сервера картинки по запросу. (Когда будет запрос к uploads, делай эту папку статической)
app.use('/uploads/avatars', express.static('uploads/avatars'));
app.use('/uploads/cases', express.static('uploads/cases'));



// Регистрируем Morgan 
app.use(morgan('dev'));



// Регистрируем модуль bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Регистрируем роут auth
app.use('/api/auth', authRoutes);

// Регистрируем роут case
app.use('/api/cases', caseRoutes);

// Регистрируем роут comment
app.use('/api/comments', commentRoutes);


// Регистрируем роут likes
app.use('/api/likes', likesRoutes);

// Регистрируем роут likes-comment
app.use('/api/likes-comment', likesCommentRoutes);

// Регистрируем роут additional-like-comment
app.use('/api/additional-like-comment', additionalLikeCommentRoutes);


// Регистрируем роут searchRoutes
app.use('/api/search', searchRoutes);





// Подготовка деплоя
if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/dist/client'));

    app.get('*', (req,res)=> {
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        );
    });
}










// Экспортируем наружу
module.exports = app;