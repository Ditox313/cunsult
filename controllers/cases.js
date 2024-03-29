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





module.exports.getAllCases = async function(req, res) {
    try {
        const cases = await Case.find().sort({ _id: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу
           
        res.status(200).json(cases);
    } catch (e) {
        errorHandler(res, e);
    }


};







module.exports.getAllCasesById = async function(req, res) {
    try {
        const cases = await Case.find({user: req.params.id}).sort({ _id: -1 })
           
        res.status(200).json(cases);
    } catch (e) {
        errorHandler(res, e);
    }

};




module.exports.create = async function(req, res) {
    try {
        // Ищем номер последнего заказа глобального
        const lastOrder = await Case.findOne({
                // user: req.user.id
            })
            .sort({ date: -1 });


        // Ищем номер последнего заказа локального
        const lastOrderLocal = await Case.findOne({
                user: req.user.id
            })
            .sort({ date: -1 });


        // Если мы нашли предполагаемы последнйи заказ, то устанвливает поле order
        const maxOrder = lastOrder ? lastOrder.order : 0;
        const maxOrderLocal = lastOrderLocal ? lastOrderLocal.orderLocal : 0;


        const xscase = new Case({
            order: maxOrder + 1,
            orderLocal: maxOrderLocal + 1,
            title: req.body.title,
            otraslSpec: req.body.otraslSpec,
            functionsNapravlenie: req.body.functionsNapravlenie,
            content: JSON.parse(req.body.content),
            user: req.user.id,
            previewSrc: req.file ? req.file.path : '', //Если файл загружен то задаем путь до файла
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
            updated.previewSrc = req.file.path;
        }

        updated.content = JSON.parse(req.body.content)



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




// Сбрасываем колличество новых комментариев кейса
module.exports.resetNewCommentsCount = async function (req, res) {
    try {
        const xscase = await Case.findById(req.params.id); //Ищем категорию по id из переданных параметров

        const updated = { commentsCountNew: 0};
        const caseUpdated2 = await Case.findOneAndUpdate({ _id: req.params.id }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        res.status(200).json(xscase);
    } catch (e) {
        errorHandler(res, e);
    }
};







// Контроллер для remove(Удалить категорию по id)
module.exports.remove = async function(req, res) {
    try {
        await Case.remove({
            _id: req.params.id 
        });


        // xscases = await Case.find({
        //     user : req.user.id
        // });

        // Возвращаем результат
        res.status(200).json({
            message: "Кейс успешно удален",
            caseIdFromRemove: req.params.id
        });
        
    } catch (e) {
        errorHandler(res, e);
    }
};





module.exports.addView = async function(req, res) {
    try {

        const xsFindOne = await Case.findOne({ _id: req.body.caseId })

        const updated = {
            orderViews: xsFindOne.orderViews + 1
        }



        // Находим и обновляем позицию. 
        const caseUpdate = await Case.updateOne({ _id: req.body.caseId }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json("+1 просмотр");

    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер для получения кейсов и функционального направления
module.exports.get_by_functionsNapravlenie_id = async function (req, res) {
    try {
        const cases1 = await Case.find({ functionsNapravlenie: req.params.id })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        const cases2 = await Case.find({ otraslSpec: req.params.id })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        if (cases1.length !== 0)
        {
            res.status(200).json(cases1);
        } else if (cases2.length !== 0)
        {
            res.status(200).json(cases2);
        }else
        {
            res.status(200).json([]);
        }
            
        
    } catch (e) {
        errorHandler(res, e);
    }
};




