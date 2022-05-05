const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../Utils/errorHendler');



// Контроллер для Login
module.exports.login = async function(req, res) {
    const candidate = await User.findOne({
        email: req.body.email
    });


    if (candidate) {
        // Проверяем на соответствие пароля
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

        if (passwordResult) {
            // Генерация токена(Генереруем объект с данными о пользователе и его кодируем)
            const token = jwt.sign({
                    email: candidate.email,
                    userId: candidate._id
                },
                keys.jwt, { expiresIn: 60 * 60 }
            );

            // Отправляем ответ
            res.status(200).json({
                token: `Bearer ${token}`,
                token_mod: token
            });
        } else {
            res.status(401).json({
                message: "Ошибка. Пароли не совпадают. Попробуйте еще раз!"
            });
        }
    } else {
        res.status(404).json({
            message: "Пользователя с таким E-mail не найдено!"
        });
    }

};









// Контроллер для register 
module.exports.register = async function(req, res) {
    // Делаем проверку на наличие пользователя в БД
    const canditate = await User.findOne({
        email: req.body.email
    });

    if (canditate) {
        res.status(409).json({
            message: "Такой Email уже существует в системе. Проверьте правильность введенных данных!"
        });
    } else {
        // Шифрование пароля пользователя
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        // Создаем пользователя
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            phone: req.body.phone,
            name: req.body.name,
            secondName: req.body.name,
            thirdName: req.body.thirdName,
            groupName: req.body.groupName,
            specialization: req.body.specialization,
            workPos: req.body.workPos,
            xsAvatar: req.body.xsAvatar,
            xsAvatar: req.body.year
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            errorHandler(res, error);
        }
    }


}





// Контроллер для get_user
module.exports.get_user = async function(req, res) {
    // Делаем проверку на наличие пользователя в БД
    const user = await User.findOne({
        _id: req.user,
    });




    if (!user) {
        res.status(409).json({
            message: "Нет такого юзера"
        });
    } else {
        try {
            res.status(200).json(user);
        } catch (error) {
            errorHandler(res, error);
        }
    }

    // res.status(200).json({
    //     "name": req.user
    // });


}