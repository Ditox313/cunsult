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
            secondName: req.body.secondName,
            thirdName: req.body.thirdName,
            program: req.body.program,
            specialization: req.body.specialization,
            workPos: req.body.workPos,
            xsAvatar: req.body.xsAvatar,
            year: req.body.year,
            city: req.body.city,
            company: req.body.company,
            otraslSpec: req.body.otraslSpec,
            functionsNapravlenie: req.body.functionsNapravlenie,
            opyt: req.body.opyt,
            education: req.body.education,
            skills: req.body.skills,
            languages: req.body.languages,
            dopInfo: req.body.dopInfo,
            family: req.body.family,
            hobby: req.body.hobby,
            publication: req.body.publication,
            compitations: req.body.compitations,
            socials: req.body.socials,


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
        _id: req.user._id,
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
}





module.exports.get_by_id = async function(req, res) {
    // Делаем проверку на наличие пользователя в БД
    const user = await User.findOne({
        _id: req.params.id,
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
}






// Контроллер для update
module.exports.update = async function(req, res) {
    try {

        // Шифрование пароля пользователя
        const salt = bcrypt.genSaltSync(10);


        const updated = req.body;
        updated.password = bcrypt.hashSync(req.body.password, salt) ;

        


        // Если объект file есть,то заполняем параметр путем фала
        if (req.file) {
            updated.xsAvatar = req.file.path;

        }



        // Находим и обновляем позицию. 
        const UserUpdate = await User.findOneAndUpdate({ _id: req.user._id, }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(UserUpdate);
    } catch (e) {
        errorHandler(res, e);
    }
};