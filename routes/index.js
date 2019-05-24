const express = require('express');
const router = express.Router();

//import controllers
const indexController = require('../controllers/index_controller');

//index route
//router.get('/', indexController.index);
router.get('/', (req, res) => {
    res.send('Hi! Working Properly!!');
})
//export router
module.exports = router;