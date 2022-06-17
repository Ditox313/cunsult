const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/comments.js');



// Роут на getAll
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getAll);



// Роут на create
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);



// Роут на update
router.patch('/update/:id', passport.authenticate('jwt', { session: false }), controller.update);









module.exports = router;