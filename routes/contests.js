const express = require('express');
const router = express.Router();

//load authcheck
const isLoggedIn = require('../config/authcheck');
//load controllers
const { index } = require('../controllers/contests_controller');

//ongoing and upcoming contests
router.get('/', isLoggedIn, index);

//export router
module.exports = router;
