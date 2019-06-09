const express = require('express');
const router = express.Router();

//load authcheck
const isLoggedIn = require('../config/authcheck');
//load controllers
const { upcoming, ongoing } = require('../controllers/contests_controller');

//ongoing contests
router.get('/ongoing', isLoggedIn, ongoing);
//upcoming contests
router.get('/upcoming', isLoggedIn, upcoming);

//export router
module.exports = router;
