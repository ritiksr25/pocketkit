const express = require('express');
const router = express.Router();

//load controllers
const { index, search } = require('../controllers/news_controller');

//news home - default articles
router.get('/', index);
//search news
router.post('/', search);

//export router
module.exports = router;
