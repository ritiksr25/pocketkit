const express = require('express');
const router = express.Router();

//load controllers
const { index, about, notauth } = require('../controllers/index_controller');

//index route
router.get('/', index);
//about route
router.get('/about', about);
//403 route
router.get('/notauth', notauth);

//export router
module.exports = router;