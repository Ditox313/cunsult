const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/search.js');



// Роут на getAll
router.post('/', passport.authenticate('jwt', { session: false }), controller.searchWidget);



module.exports = router;