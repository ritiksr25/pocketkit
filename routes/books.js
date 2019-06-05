const express = require('express');
const router = express.Router();

//load controllers
const booksController = require('../controllers/books_controller');

//books index route
router.get('/', booksController.index);
//search results
router.post('/', booksController.search);
//user library
router.get('/library', booksController.library);
router.post('/library/add/:id', booksController.add);
router.get('/library/delete/:id', booksController.delete);

//export router
module.exports = router;