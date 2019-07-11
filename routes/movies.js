const express = require('express');
const router = express.Router();

//load authcheck
const { isLoggedIn } = require('../config/authcheck');
//load controller files
const { index, view } = require('../controllers/movies_controller');

//index route -search form
router.get('/', isLoggedIn, index);
//view single movie
router.get('/:id', isLoggedIn, view);

//export router
module.exports = router;
