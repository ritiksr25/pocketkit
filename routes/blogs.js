const express = require('express');
const router = express.Router();

//load authcheck
const isLoggedIn = require('../config/authcheck');
//load controller
const blogController = require('../controllers/blogs_controller')

//index route -view all user blogs
router.get('/', isLoggedIn, blogController.index);
//view single blog
router.get('/id/:id', isLoggedIn, blogController.single);
//user blogs
router.get('/myBlogs', isLoggedIn, blogController.myBlogs);
router.get('/user/:id', blogController.userBlogs);
//add blog
router.get('/add', isLoggedIn, blogController.add);
router.post('/add', isLoggedIn, blogController.addProcess);
//update blog
router.get('/update/:id', isLoggedIn, blogController.update);
router.post('/update/:id', isLoggedIn, blogController.updateProcess);
//delete blog
router.get('/delete/:id', isLoggedIn, blogController.delete);
//like and unlike blog route
router.post('/like/:id', isLoggedIn, blogController.like);
router.post('/unlike/:id', isLoggedIn, blogController.unlike);
//comments
router.post('/comment/:id', isLoggedIn, blogController.comment);
router.post('/uncomment/:id', blogController.uncomment);

//export router
module.exports = router;