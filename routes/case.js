const express = require('express');
const passport = require('passport');
// const upload = require('../middleware/upload');
const upload_cases = require('../middleware/upload_case');
const router = express.Router();
const controller = require('../controllers/cases.js');



// Роут на getAll
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);



// Роут на create с загрузкой картинки
router.post('/', passport.authenticate('jwt', { session: false }), upload_cases.single('previewSrc'), controller.create);



//Роут для загрузки изображений при создании кейса
router.post('/upload', upload_cases.single('image'), controller.uploadEditor);



// Роут на update
router.patch('/update/:id', passport.authenticate('jwt', { session: false }), upload_cases.single('previewSrc'), controller.update);



// Роут на getById
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);



// Роут на remove
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);






module.exports = router;