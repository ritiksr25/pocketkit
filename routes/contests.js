const express = require('express');
const router = express.Router();

//load controllers
const { index } = require('../controllers/contests_controller');

//ongoing and upcoming contests
router.get('/', index);

//export router
module.exports = router;
