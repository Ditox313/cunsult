const Comment = require('../models/Comment');
const Case = require('../models/Case');
const User = require('../models/User');
const errorHandler = require('../Utils/errorHendler');




module.exports.create = async function(req, res) {
    try {


        // Ищем текущего юзера
        // const currentUser = await User.findOne({
        //     _id: req.user.id
        // })

        const currentUserComment = await User.findOne({
            _id: req.body.commentUserId
        })

        // Получаем колличество дополнительх комментариев данного пользователя
        const additionalLikeUserCount = currentUserComment.additionalCommentsCount ? currentUserComment.additionalCommentsCount : 0


        // Задаем значения для обновления 
        const updateUser = {
            additionalCommentsCount: additionalLikeUserCount + 1
        };


        // Обновляем пользователя
        const updateUserAdditionalComments = await User.findOneAndUpdate({ _id: req.body.commentUserId }, //Ищем по id
            { $set: updateUser }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );






        
        const updated = { additionalLike: { 
            commentUserId: req.body.commentUserId, 
            commentUserName: req.body.commentUserName, 
            commentUserSecondName: req.body.commentUserSecondName  
        }};

        const commentUpdated = await Comment.findOneAndUpdate({ _id: req.body.commentId }, //Ищем по id
            { $push: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        const actualComment = await Comment.findById({ _id: req.body.commentId })
        const actualCaseAdditionalComments = await Comment.find({ caseId: req.body.caseId })


        // Находим обновленное свойство колличества благодарностей и возвращаем его
        // const actualUser = await (await User.find({ _id: req.body.commentUserId }))
        // const actualUserAdditionalLikesNumber = actualUser[0].additionalCommentsCount

        

        await res.status(201).json({
            message: '+ 1 лайк',
            comment: actualComment,
            actualCaseAdditionalComments: actualCaseAdditionalComments,
            // actualUserAdditionalLikesNumber: actualUserAdditionalLikesNumber
        });

    } catch (e) {
        errorHandler(res, e);
    }
};



module.exports.remove = async function (req, res) {
    try {

        // Ищем текущего юзера
        // const currentUser = await User.findOne({
        //     _id: req.user.id
        // })

        const currentUserComment = await User.findOne({
            _id: req.body.commentUserId
        })

        // Получаем колличество дополнительх комментариев данного пользователя
        const additionalLikeUserCount = currentUserComment.additionalCommentsCount


        // Задаем значения для обновления 
        const updateUser = {
            additionalCommentsCount: additionalLikeUserCount - 1
        };


        // Обновляем пользователя
        const updateUserAdditionalComments = await User.findOneAndUpdate({ _id: req.body.commentUserId }, //Ищем по id
            { $set: updateUser }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );




        const actualCaseForDaleteLike = await Comment.findById({ _id: req.body.commentId })
        const actualCaseForDaleteLike2 = actualCaseForDaleteLike.additionalLike
        const actualCaseForDaleteLike3 = actualCaseForDaleteLike.additionalLike.filter(item => item.commentUserId !== req.body.commentUserId)


        const updated = {
            additionalLike: actualCaseForDaleteLike3
        };

        const caseUpdated = await Comment.findOneAndUpdate({ _id: req.body.commentId }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        const actualComment = await Comment.findById({ _id: req.body.commentId })
        
        // Находим обновленное свойство колличества благодарностей и возвращаем его
        // const actualUser = await (await User.find({ _id: req.body.commentUserId }))
        // const actualUserAdditionalLikesNumber = actualUser[0].additionalCommentsCount



        await res.status(201).json({
            actualComment: actualComment,
            // actualUserAdditionalLikesNumber: actualUserAdditionalLikesNumber
        });

    } catch (e) {
        errorHandler(res, e);
    }
};







