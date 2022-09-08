const Comment = require('../models/Comment');
const Case = require('../models/Case');
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
            userSecondName: req.body.userSecondName,
            parentId: req.body.parentId,
            caseId: req.body.caseId,
            userId: req.body.userId
        });


        // Добавляем поле колличества комментариев в кейс
        const commentsNumber = await Case.find({ _id: req.body.caseId });
        const maxOrder = commentsNumber[0].commentsCount ? commentsNumber[0].commentsCount : 0;
        const updated = {commentsCount: maxOrder + 1};
        const caseUpdated = await Case.findOneAndUpdate({ _id: req.body.caseId }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: false } //обновит позицию и верет нам уже обновленную
        );


        // Добавляем колличество новых комментариев в кейс
        const xCase = await Case.find({ _id: req.body.caseId });
        const maxOrderNew = xCase[0].commentsCountNew ? xCase[0].commentsCountNew : 0;
        const updatedNew = { commentsCountNew: maxOrderNew + 1 };
        const caseUpdatedNew = await Case.findOneAndUpdate({ _id: req.body.caseId }, //Ищем по id
            { $set: updatedNew }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: false } //обновит позицию и верет нам уже обновленную
        );

        

        await comment.save(); //Сохраняем комментарий

        await res.status(201).json(comment);

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

        const activeComment = await Comment.find({ _id: req.params.id })

    


        const commentsNumber2 = await Case.find({ _id: activeComment[0].caseId });
        const maxOrder2 = commentsNumber2[0].commentsCountNew ? commentsNumber2[0].commentsCountNew : 0;
        const updated2 = { commentsCountNew: maxOrder2 - 1 };
        const caseUpdated2 = await Case.findOneAndUpdate({ _id: activeComment[0].caseId }, //Ищем по id
            { $set: updated2 }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        



        // Изменяем колличество комменатриев в кейсе
        const commentsNumber = await Case.find({ _id: activeComment[0].caseId});
        const maxOrder = commentsNumber[0].commentsCount ? commentsNumber[0].commentsCount : 0;
        const updated = {commentsCount: maxOrder - 1};
        const caseUpdated = await Case.findOneAndUpdate({ _id: activeComment[0].caseId }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        await Comment.remove({
            _id: req.params.id 
        });


        // Возвращаем результат
        res.status(200).json({
            message: "Комментарий успешно удален"
        });
    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер для getById
module.exports.getById = async function (req, res) {
    try {
        const xscomment = await Comment.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(xscomment);
    } catch (e) {
        errorHandler(res, e);
    }
};


// Контроллер для getById
module.exports.getByIdCase = async function (req, res) {
    try {
        const xscomment = await Comment.find({caseId: req.params.id}); 
        res.status(200).json(xscomment);
    } catch (e) {
        errorHandler(res, e);
    }
};

