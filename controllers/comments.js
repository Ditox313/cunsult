const Comment = require('../models/Comment');
const errorHandler = require('../Utils/errorHendler');





module.exports.getAll = async function(req, res) {
    try {


        // Создаем объект запроса
        const query = {
            caseId: req.params.id
        }

        const comments = await Comment.find(query).sort({ _id: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        res.status(200).json(comments);
    } catch (e) {
        errorHandler(res, e);
    }

};




module.exports.create = async function(req, res) {
    try {
        const comment = new Comment({
            body: req.body.body,
            username: req.body.username,
            parentId: req.body.parentId,
            caseId: req.body.caseId,
            userId: req.body.userId

        });

        await comment.save(); //Сохраняем кейс

        res.status(201).json(comment);

    } catch (e) {
        errorHandler(res, e);
    }
};




// Контроллер для update
module.exports.update = async function(req, res) {
    try {

        const updated = req.body;

        // Находим и обновляем позицию. 
        const commentUpdated = await Comment.findOneAndUpdate({ _id: req.params.id }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(commentUpdated);
    } catch (e) {
        errorHandler(res, e);
    }
};





// Контроллер для remove(Удалить категорию по id)
module.exports.remove = async function(req, res) {
    try {
        await Comment.remove({
            _id: req.params.id //Удаляем категорию по id
        });


        // Возвращаем результат
        res.status(200).json({
            message: "Комментарий успешно удален"
        });
    } catch (e) {
        errorHandler(res, e);
    }
};