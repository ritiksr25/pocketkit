const express = require('express');
const router = express.Router();

//load authcheck
const { isLoggedIn } = require('../config/authcheck');
//load controller files
const { index, search, view } = require('../controllers/movies_controller');

//index route -search form
router.get('/', isLoggedIn, index);
//results -post route
router.post('/', isLoggedIn, search);
//view single movie
router.get('/:id', isLoggedIn, view);

//export router
module.exports = router;