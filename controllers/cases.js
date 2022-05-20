const Case = require('../models/Case');
const errorHandler = require('../Utils/errorHendler');






module.exports.getAll = async function(req, res) {
    try {
        // Создаем объект запроса
        const query = {
            user: req.user.id
        }

        const cases = await Case.find(query).sort({ _id: -1 })
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




// Контроллер для update
module.exports.update = async function(req, res) {
    try {

        const updated = req.body;


        // Если объект file есть,то заполняем параметр путем фала
        if (req.file) {
            updated.xsAvatar = req.file.path;

        }



        // Находим и обновляем позицию. 
        const caseUpdate = await Case.findOneAndUpdate({ _id: updated.caseId }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(req.body);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер для getById
module.exports.getById = async function(req, res) {
    try {
        const xscase = await Case.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(xscase);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер для remove(Удалить категорию по id)
module.exports.remove = async function(req, res) {
    try {
        await Case.remove({
            _id: req.params.id //Удаляем категорию по id
        });


        // Возвращаем результат
        res.status(200).json({
            message: "Кейс успешно удален"
        });
    } catch (e) {
        errorHandler(res, e);
    }
};