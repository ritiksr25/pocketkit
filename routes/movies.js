const express = require('express');
const router = express.Router();

//load controller files
const { index, search, view } = require('../controllers/movies_controller');

//index route -search form
router.get('/', index);
//results -post route
router.post('/', search);
//view single movie
router.get('/', view);

//export router
module.exports = router;