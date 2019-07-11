const express = require('express');
const router = express.Router();
//load authcheck
const { isLoggedIn } = require('../config/authcheck');

//load controllers
const { index } = require('../controllers/news_controller');

//news home - default articles
router.get('/', isLoggedIn, index);

//export router
module.exports = router;
