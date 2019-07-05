const express = require('express');
const router = express.Router();

//load authcheck
const { isLoggedIn } = require('../config/authcheck');
//load controllers
const { index, search } = require('../controllers/news_controller');

//news home - default articles
router.get('/', isLoggedIn, index);
//search news
router.post('/', isLoggedIn, search);

//export router
module.exports = router;