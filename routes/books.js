const express = require('express');
const router = express.Router();

//load authcheck
const isLoggedIn = require('../config/authcheck');
//load controllers
const booksController = require('../controllers/books_controller');

//books index route
router.get('/', isLoggedIn, booksController.index);
//search results
router.post('/', isLoggedIn, booksController.search);
//user library
router.get('/library', isLoggedIn, booksController.library);
router.post('/library/add/:id', isLoggedIn, booksController.add);
router.get('/library/delete/:id', isLoggedIn, booksController.delete);

//export router
module.exports = router;