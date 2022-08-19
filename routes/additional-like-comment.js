const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/additional-like-comment.js');



// Добавить лайк
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);

// // Роут на remove
router.post('/remove', passport.authenticate('jwt', { session: false }), controller.remove);

// Добавить дизлайк
// router.post('/dislike', passport.authenticate('jwt', { session: false }), controller.createDislike);

// // Роут на remove дизлайк
// router.post('/remove/disLike', passport.authenticate('jwt', { session: false }), controller.removeDislike);













module.exports = router;