const express = require('express');
const router = express.Router();

//load authcheck
const { isLoggedIn } = require('../config/authcheck');
//load controllers
const {
	index,
	library,
	add,
	Delete
} = require('../controllers/books_controller');

//books index route
router.get('/', isLoggedIn, index);
//user library
router.get('/library', isLoggedIn, library);
router.get('/library/add/:id', isLoggedIn, add);
router.get('/library/delete/:id', isLoggedIn, Delete);

//export router
module.exports = router;
