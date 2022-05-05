const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.js');
const passport = require('passport');



// Роут на login
router.post('/login', controller.login);




// Роут на register
router.post('/register', controller.register);



// Роут на get_user
router.get('/user', passport.authenticate('jwt', { session: false }), controller.get_user);


// router.get('/:id', passport.authenticate('jwt', { session: false }), controller.get_user);






module.exports = router;