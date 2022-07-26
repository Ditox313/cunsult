const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.js');
const passport = require('passport');
const upload = require('../middleware/upload');




// Роут на login
router.post('/login', controller.login);




// Роут на register
router.post('/register', controller.register);



// Роут на get_user
router.get('/user', passport.authenticate('jwt', { session: false }), controller.get_user);


// get by id
router.get('/user/:id', passport.authenticate('jwt', { session: false }), controller.get_by_id);


// Роут на update
router.patch('/update', passport.authenticate('jwt', { session: false }), upload.single('xsAvatar'), controller.update);








module.exports = router;