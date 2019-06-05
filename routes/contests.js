const express = require('express');
const router = express.Router();

//load controllers
const { upcoming, ongoing } = require('../controllers/contests_controller');

//ongoing contests
router.get('/ongoing', ongoing);
//upcoming contests
router.get('/upcoming', upcoming);

//export router
module.exports = router;
