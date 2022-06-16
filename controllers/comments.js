const Comment = require('../models/Comment');
const errorHandler = require('../Utils/errorHendler');






module.exports.getAll = async function(req, res) {
    try {


        // Создаем объект запроса
        const query = {
            caseId: req.params.id
        }

        const comments = await Comment.find(query)

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