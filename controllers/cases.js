const Case = require('../models/Case');
const errorHandler = require('../Utils/errorHendler');






module.exports.getAll = async function(req, res) {
    try {
        const cases = await Case.find({
            user: req.user.id //Ищем категории по пользователю который их создал
        });
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

        await xscase.save(); //Сохраняем созданную категорию

        res.status(201).json(xscase);

    } catch (e) {
        errorHandler(res, e);
    }
};


// Контроллер для getById
// module.exports.getById = async function(req, res) {
//     try {
//         const categories = await Category.findById(req.params.id); //Ищем категорию по id из переданных параметров
//         res.status(200).json(categories);
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };


// Контроллер для remove(Удалить категорию по id)
// module.exports.remove = async function(req, res) {
//     try {
//         await Category.remove({
//             _id: req.params.id //Удаляем категорию по id
//         });

//         await Position.remove({
//             category: req.params.id //Удаляем позиции из этой категории
//         });

//         // Возвращаем результат
//         res.status(200).json({
//             message: "Категория и позиции данной категории удалены"
//         });
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };





// Контроллер для update
// module.exports.update = async function(req, res) {
//     try {
//         const updated = {
//             name: req.body.name,
//         };


//         // Если объект file есть,то заполняем параметр путем фала
//         if (req.file) {
//             updated.imageSrc = req.file.path;

//         }


//         const category = await Category.findOneAndUpdate({ _id: req.params.id, }, //Ищем по id
//             { $set: updated }, //Обновлять мы будем body запроса. В updated находятся данные на которые будем менять старые
//             { new: true } //обновит позицию и верет нам уже обновленную
//         );



//         res.status(200).json(category);
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };