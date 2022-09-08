const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/search.js');



router.post('/', passport.authenticate('jwt', { session: false }), controller.searchWidget);

// router.post('/result', passport.authenticate('jwt', { session: false }), controller.searchResult);



module.exports = router;