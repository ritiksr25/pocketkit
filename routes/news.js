const express = require('express');
const router = express.Router();

//load controllers
const { newstories, beststories, topstories } = require('../controllers/news_controller');

//news home new stories
router.get('/new', newstories);
//best stories
//router.get('/best', beststories);
//top stories
//router.get('/top', topstories);

//export router
module.exports = router;