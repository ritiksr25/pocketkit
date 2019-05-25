const express = require('express');
const router = express.Router();

//import controllers
const { index, notauth } = require('../controllers/index_controller');

//index route
router.get('/', index);
//403 route
router.get('/notauth', notauth);

//export router
module.exports = router;