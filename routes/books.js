const express = require('express');

const router = express.Router();

//load controllers
const books = require('../controllers/books_controller');

//books index route
router.get('/', books.index);

//export router
module.exports = router;