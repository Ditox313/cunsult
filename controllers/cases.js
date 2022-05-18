const Case = require('../models/Case');
const errorHandler = require('../Utils/errorHendler');






module.exports.getAll = async function(req, res) {
    try {
        // Создаем объект запроса
        const query = {
            user: req.user.id
        }

        const cases = await Case.find(query)
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу


        res.status(200).json(cases);
    } catch (e) {
        errorHandler(res, e);
    }

};




module.exports.create = async function(req, res) {
    try {

        const xscase = new Case({
            title: req.body.title,
            content: req.body.content,
            user: req.user.id,
            imageSrc: req.file ? req.file.path : '' //Если файл загружен то задаем путь до файла
        });

        await xscase.save(); //Сохраняем кейс

        res.status(201).json(xscase);

    } catch (e) {
        errorHandler(res, e);
    }
};




module.exports.uploadEditor = async function(req, res) {
    try {


        res.status(201).json({
            "success": 1,
            "file": {
                "url": req.file.path,
            }
        });

    } catch (e) {
        errorHandler(res, e);
    }
};