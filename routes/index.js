const express = require('express');
const router = express.Router();

//load controllers
const { index, about, notauth } = require('../controllers/index_controller');
const { admin } = require('../controllers/user_controller');

const { adminAuth } = require('../config/authcheck');

//index route
router.get('/', index);
//about route
router.get('/about', about);
//403 route
router.get('/notauth', notauth);
// admin route
router.get('/admin', adminAuth, admin);

//export router
module.exports = router;