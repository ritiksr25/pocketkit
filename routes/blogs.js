const express = require('express');
const router = express.Router();

//load controller
const blogController = require('../controllers/blogs_controller')

//index route -view all user blogs
router.get('/', blogController.index);
//view single blog
router.get('/id/:id', blogController.single);
//user blogs
router.get('/myBlogs', blogController.myBlogs);
//router.get('/user/:id', blogController.userBlogs);
//add blog
router.get('/add', blogController.add);
router.post('/add', blogController.addProcess);
//update blog
router.get('/update/:id', blogController.update);
router.post('/update/:id', blogController.updateProcess);
//delete blog
router.get('/delete/:id', blogController.delete);
//like and unlike blog route
router.get('/like/:id', blogController.like);
router.get('/unlike/:id', blogController.unlike);
//comments
router.post('/comment/:id', blogController.comment);
//router.get('/uncomment/:id', blogController.uncomment);

//export router
module.exports = router;