const Comment = require('../models/Comment');
const Case = require('../models/Case');
const errorHandler = require('../Utils/errorHendler');




module.exports.create = async function(req, res) {
    try {

        
        const updated = {likes: {userId: req.body.userId}};
        const caseUpdated = await Comment.findOneAndUpdate({ _id: req.body.commentId }, //Ищем по id
            { $push: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        const actualComment = await Comment.findById({ _id: req.body.commentId })

        

        await res.status(201).json({
            message: '+ 1 лайк',
            comment: actualComment
        });

    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.createDislike = async function(req, res) {
    try {

        
        const updated = {disLikes: {userId: req.body.userId}};
        const caseUpdated = await Comment.findOneAndUpdate({ _id: req.body.commentId }, //Ищем по id
            { $push: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        const actualComment = await Comment.findById({ _id: req.body.commentId })

        

        await res.status(201).json({
            message: '- 1 лайк',
            comment: actualComment
        });

    } catch (e) {
        errorHandler(res, e);
    }
};


module.exports.remove = async function(req, res) {
    try {

        const actualCaseForDaleteLike = await Comment.findById({ _id: req.body.commentId })
        const actualCaseForDaleteLike2 = actualCaseForDaleteLike.likes
        const actualCaseForDaleteLike3 = actualCaseForDaleteLike.likes.filter(item => item.userId !== req.body.userId)

        
        const updated = {
            likes: actualCaseForDaleteLike3
        };

        const caseUpdated = await Comment.findOneAndUpdate({ _id: req.body.commentId }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        const actualComment = await Comment.findById({ _id: req.body.commentId })

        

        await res.status(201).json(actualComment);

    } catch (e) {
        errorHandler(res, e);
    }
};


module.exports.removeDislike = async function(req, res) {
    try {

        const actualCaseForDaleteLike = await Comment.findById({ _id: req.body.commentId })
        const actualCaseForDaleteLike2 = actualCaseForDaleteLike.disLikes
        const actualCaseForDaleteLike3 = actualCaseForDaleteLike.disLikes.filter(item => item.userId !== req.body.userId)

        
        const updated = {
            disLikes: actualCaseForDaleteLike3
        };

        const commentUpdated = await Comment.findOneAndUpdate({ _id: req.body.commentId }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        const actualComment = await Comment.findById({ _id: req.body.commentId })

        

        await res.status(201).json(actualComment);

    } catch (e) {
        errorHandler(res, e);
    }
};






